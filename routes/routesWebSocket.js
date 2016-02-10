var socket = require('socket.io'),
    http = require('http'),
    async = require('async');

module.exports = function(app, io){

    function websocketApi(){
        console.log("websocketAPI");
        io.sockets.on('connection', function(socket) {
            socket.on('logs', function(data) {
                checkLogs(function(data) {
                    socket.emit('logs', {
                        logsName: conf.logsFiles,
                        logs: data
                    });
                });
            });
        });
    }

    function sendDataWs(){
        var clients = io.sockets.clients().length;
        var heure =new Date();
        var h=(heure.getHours()<10)?("0"+heure.getHours()):(heure.getHours());
        var m=(heure.getMinutes()<10)?("0"+heure.getMinutes()):(heure.getMinutes());
        var s=(heure.getSeconds()<10)?("0"+heure.getSeconds()):(heure.getSeconds());
        heure = h+":"+m+":"+s;
        // console.log("active user(s) using monitor :" + clients);
        getAllData(function(data){
            io.sockets.emit('clients', {
                clients:clients,
                heure:heure,
                data: data
            });
        });
    }

    function getAllData(cb){
        var data={};
        var items = {};
        for(var route in monitor) {
            for(var item in monitor[route]){
                items[route+""+item] = monitor[route][item];
            }
        }
        async.parallel(items,
        function(err, results){
            cb(results);
        });
    }

    setInterval(function(){
        sendDataWs();
    },5000);

    // websocketApi();
};