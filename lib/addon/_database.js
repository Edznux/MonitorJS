var mysql = require('mysql');
var config = require('../../config');
var config = require('../../config');

var pool = mysql.createPool({
	host: config.DB.host,
	user: config.DB.user,
	password: config.DB.password,
	database : config.DB.database
});
/*
module.exports = function(monitor){
	// monitor.database={};
	function recursiveLoop(keys,key){
		var keys = Object.getOwnPropertyNames(monitor);
		var key;
		for(var i=0;i<keys.length;i++){
			key = Object.getOwnPropertyNames(monitor[fields[i]]);
		}

				console.log("oookoko")
				monitor[keys][key](function(data){
					console.log("keys : ",keys," key ",key," = ", JSON.stringify(data));
					field = {};
					field["'"+key+"'"]=monitor[keys][key];
					console.log(field)
					var now = new Date().getTime()/1000; // /1000 for unix like timestamp (js in in ms , unix in sec)
					pool.query("INSERT INTO "+keys+" (stats,infos,timestamp) VALUES(?,?,?)",[
								JSON.stringify(stats), 
								JSON.stringify(infos),
								now
							],function(err,rows,fields){
						if(err) throw err;
						console.log("Field correctly insert")
						recursiveLoop(keys,key);
					});
				});
			key++;
			}
		keys++;
		}
	}
	
	setInterval(function(){
		var keys=0,key=0;
		recursiveLoop(keys,key);
		/*for(var keys =0; keys<monitor.length; keys++){
			for(var key=0;key<monitor[keys].length;key++){
				monitor[keys][key](function(data){
					console.log("keys : ",keys," key ",key," = ", JSON.stringify(data))
					var now = new Date().getTime()/1000; // /1000 for unix like timestamp (js in in ms , unix in sec)
				});
			}
		}				
		*/
		/*
		monitor.cpu.stats(function(stats){
			monitor.cpu.infos(function(infos){
				var now = new Date().getTime()/1000; // /1000 for unix like timestamp (js in in ms , unix in sec)
				console.log(now)
				pool.query("INSERT INTO CPU (stats,infos,timestamp) VALUES(?,?,?)",[
										JSON.stringify(stats),
										JSON.stringify(infos),
										now
					],function(err,rows,fields){
					if(err) throw err;
					console.log("Field correctly insert")
				});
			});
		});
		*/
/*	},config.perf.clockSave/6)


	// monitor.database.save=function(callback){
	// 	callback("logs blblbl");
	// }
}
*/
