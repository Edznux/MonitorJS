var socket = require('socket.io'),
    http = require('http');

module.exports = function(app){
 var io = app.io;

    app.sendDataWs = function sendDataWs (data, channel) {
        console.log("sendDataWs call");
        var clients = io.sockets.clients().length;
        var heure =new Date();
        var h=(heure.getHours()<10)?("0"+heure.getHours()):(heure.getHours());
        var m=(heure.getMinutes()<10)?("0"+heure.getMinutes()):(heure.getMinutes());
        var s=(heure.getSeconds()<10)?("0"+heure.getSeconds()):(heure.getSeconds());
        heure = h+":"+m+":"+s;
        // console.log("active user(s) using monitor :" + clients);

        // default channel
        if(!channel){
            channel = "clients";
        }

        /*
        * Send data or Default : all data;
        */
        if(data){
            io.sockets.emit(channel, {
                clients:clients,
                heure:heure,
                data: data
            });
        }else{
            getAllData(function(err, data){
                if(err){
                    console.log(err);
                    throw err;
                }
                io.sockets.emit(channel, {
                    clients:clients,
                    heure:heure,
                    data: data
                });
            });
        }
    }

    setInterval(function(){
        app.sendDataWs();
    },10000);

};

function getAllData(cb){
    var nbCallback = 0;
    var data={};
    var obj = {};
    for(var route in monitor) {
        obj[route] = {};
        for(var item in monitor[route]){
            nbCallback++;
            (function (route,item){
                monitor[route][item](function(err,data){
                obj[route][item] = data;
                    if(err){
                        console.log(err);
                        return cb(err, null);
                    }
                    nbCallback--;
                    if(nbCallback == 0){
                        return cb(null, obj);
                    }
                });
            })(route,item);
        }
    }
}

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