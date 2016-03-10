var EventEmitter = require('events');
var util = require('util');
var config = require('../../config.js');
var monitor = require("../core.js");

/*
* If each values of each component > it's own threshold, triggers alert
* ! percentage !
*/
var diskThreshold = 0.80;
var cpuThreshold = 0.90;
var memoryThreshold = 0.90;
var app;

function Alert(app) {
	EventEmitter.call(this);
	// app.sendDataWs("test data", "clients");
}
util.inherits(Alert, EventEmitter);


module.exports = Alert;
var Alert = new Alert(app);


Alert.on('disk', function(data){
	console.log('Alert on disk, value :', data);
});

Alert.on('cpu', function(data){
	console.log('Alert on cpu, value :', data);
});

Alert.on('memory', function(data){
	console.log('Alert on memory, value :', data);
});

setInterval(function(){

	monitor.disk.use(function(err, data){
		if(err){
			console.error(err);
		}
		use = data.data;
		len = use.length;
		for(var i=0; i<len; i++ ){
			if(use[i] > diskThreshold){
				Alert.emit('disk', use[i]);
			}
		}
	});

	monitor.cpu.load(function(err, data){
		if(err){
			console.error(err);
		}
		load = (data.data / 100);
		if(load > cpuThreshold){
			Alert.emit('cpu', load);
		}
	});

	monitor.memory.total(function(err, data){
		var total = data.data;
		monitor.memory.free(function(err, data){
			if(err){
				console.error(err);
			}
			free = data.data;
			percentage = 1 - (free / total);
			if(percentage > memoryThreshold){
				Alert.emit('memory', percentage);
			}
		});
	});

}, 2000);

