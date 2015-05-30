var express = require('express'),
    http = require('http'),
    app = express(),
    fs = require('fs'),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    engine = require('ejs-locals'),
    compress = require('compression');

var version = "0.0.2";

app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));
app.use(compress());
io.set('log level', 1);
app.set('views', __dirname + '/views');
app.engine('ejs', engine);
app.set('view engine', 'ejs');
var conf = require("./config");

/**
 *Database schema mongodb
 */
    // mongoose.connect('localhost', 'monitor');
    // var db = mongoose.connection;
    // db.on('error', console.error.bind(console, 'connection error:'));
    // db.once('open', function callback() {
    //     console.log('Connected to DB');
    // });
/**
*Database schema MySQL
*/
// var query = require("./lib/database/mysql")();
var monitor = require("./lib/core.js");

/**
* Addons Loader
*/
fs.readdir("./lib/addon", function(err,files){
    console.log(files);
    if(typeof files !== "undefined"){
        for(var i=0;i<files.length;i++){  
            if(files[i][0] != "_"){ // ignore file starting with _ char (disable module)
                require("./lib/addon/"+files[i])(monitor);
                console.log("module "+files[i] +" loaded");
            }else{
                console.log("module "+files[i] +" NOT loaded");
            }
        }
    }else{
        console.log('no addon loaded');
    }
});

//routing there, if you don't wan't our web interface, you can comment line with routeWeb
require("./routes/routesWeb")(app);
require("./routes/routesAnalytics")(app);
require("./routes/routesApi")(app);

io.sockets.on('connection', function(socket) {
    socket.on('logs', function(data) {
        checkLogs(function(data) {
            socket.emit('logs', {
                logsName: conf.logsFiles,
                logs: data
            });
        });
    });
    socket.on('all', function(data) {
        var clients = io.sockets.clients().length;
        var heure =new Date();
        var h=(heure.getHours()<10)?("0"+heure.getHours()):(heure.getHours());
        var m=(heure.getMinutes()<10)?("0"+heure.getMinutes()):(heure.getMinutes());
        var s=(heure.getSeconds()<10)?("0"+heure.getSeconds()):(heure.getSeconds());
        heure = h+":"+m+":"+s;
        // console.log("active user(s) using monitor :" + clients);
            socket.emit('clients', {
                clients:clients,
                heure:heure
            });
    });
});
server.listen(3333, function() {
    console.log('==============Web server listening on port 3333===============\n=============== MonitorJS version ' + version +" ===================");
});