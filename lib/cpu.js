var conf = require('../config'),
	os = require("os");
var tab= [];
var currentDate;

	setInterval(function(){
		Load = {};
		if(tab.length>60){
			tab.shift();		//keeps only last 60 values
		}

		var infos = os.cpus();
		var sum = 0;
		var idle= 0;
		for(var i= 0; i < infos.length ; i++){
			sum += parseInt(infos[i].times.user) + parseInt(infos[i].times.nice) + parseInt(infos[i].times.sys) + parseInt(infos[i].times.idle);
			idle += infos[i].times.idle;
		}

		Load.time = new Date().getTime()/1000; //seconds !
		Load.value = sum;
		Load.idle = idle;
		tab.push(Load);
	},conf.perf.clockGlobal);

module.exports = function(over){
	if(tab[tab.length-over-1] === undefined){
		return {"error":"please retry in few seconds"};
	}
	var totaliffie1 =  tab[tab.length-1-over].value;
	var workJiffie1 =  tab[tab.length-1-over].value - tab[tab.length-1-over].idle;
	// console.log(workJiffie1);
	var totalJiffie2 =  tab[tab.length-1].value;
	var workJiffie2 =  tab[tab.length-1].value - tab[tab.length-1].idle;
	// console.log(workJiffie2);

	var workOverPeriod = workJiffie2 - workJiffie1;
	var totalOverPeriod = totalJiffie2 - totaliffie1;
	var percentCpu =(workOverPeriod / totalOverPeriod )* 100;

	console.log(percentCpu);

	return percentCpu;
};