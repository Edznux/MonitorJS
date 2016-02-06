var express = require('express'),
    util    = require('util'),
    async   = require('async'),
    http    = require('http'),
    app     = express(),
    fs      = require('fs'),
    server  = http.createServer(app),
    socket  = require('socket.io'),
    io      = socket.listen(server),
    engine  = require('ejs-locals'),
    compress= require('compression');    // mongoose = require('mongoose');

var version = "0.0.2";

app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));
app.use(compress());
io.set('log level', 1);
app.set('views', __dirname + '/views');
app.engine('ejs', engine);
app.set('view engine', 'ejs');
var conf= require("./config");
var clock= require("./lib/clock");

if(conf.DB.enable){
    // mongoose.connect('mongodb://localhost:27017/monitor');
    // clock.enable();
}

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
require("./routes/routesWebSocket")(app,io);


server.listen(3000, function() {
    console.log('==============Web server listening on port 3333===============\n=============== MonitorJS version ' + version +" ===================");
});
