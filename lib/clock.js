var conf= require("../config");

/**
*	Models
*/
var Memory 	= require('../model/Memory');
var Cpu 	= require('../model/Cpu');
var Network = require('../model/Network');
var Disk 	= require('../model/Disk');
var clock 	= {};

clock.enable = function(){
	setInterval(function(){
		Cpu.store();
		Memory.store();
		//todo : read all data into the monitor object
	},conf.perf.clockSave);
}
module.exports = clock;