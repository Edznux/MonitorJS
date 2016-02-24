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

var version = "0.0.3";
var port = 3000;

app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));
app.use(compress());
io.set('log level', 1);
app.set('views', __dirname + '/views');
app.engine('ejs', engine);
app.set('view engine', 'ejs');
var conf= require("./config");
var clock= require("./lib/clock");

app.monitor = require("./lib/core.js");

/**
* Addons Loader
*/
fs.readdir("./lib/addon", function(err,files){
    console.log(files);
    if(typeof files !== "undefined"){
        for(var i=0;i<files.length;i++){
            if(files[i][0] != "_"){ // ignore file starting with _ char (disable module)
                require("./lib/addon/"+files[i])(app);
                console.log("module "+files[i] +" loaded");
            }else{
                console.log("module "+files[i] +" NOT loaded");
            }
        }
    }else{
        console.log('no addon loaded');
    }
});

require("./routes/routesAnalytics")(app);
require("./routes/routesApi")(app);
require("./routes/routesWebSocket")(app,io);


server.listen(port, function() {
    console.log('==============Web server listening on port '+port+'===============\n=============== MonitorJS version ' + version +" ===================");
});
