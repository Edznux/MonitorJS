var config	= require("../../config");
var monitor = require("../core.js");
var mongo = require('sails-mongo');
var MongoClient = require('mongodb').MongoClient;

module.exports = function(app){
	var db, collection;

	// Make an array of data that you want to save
	var whitelist = {
						"disk":["all"],
						"cpu":["load", "stats"],
						"network":["rx","tx","interfaces", "ping"],
						"memory":["all"]
					};
	init();

	function init(){
		MongoClient.connect('mongodb://127.0.0.1:27017/monitor', function(err, database) {
			if(err){
				console.error("Database connection error :",err);
				return;
			}
			db=database;
		});
		
		setInterval(function(){
			loopData();
		}, 5000);
	}

	function loopData(){
		var route, item;
		for(var i in whitelist) {
			for(var j in whitelist[i]){
				route = i;
				item = whitelist[i][j];
				saveData(route, item);
			}
		}
	}

	function saveData(route, item){
		// save model with "all" data
		var insertData;
		if(monitor[route][item]){
			monitor[route][item](function(err,data){
				if(err){
					console.error("err in saveData() : ", data);
					return;
				}

				collection = db.collection(route+""+item);
				insertData = {};
				// insertData[item] = {};
				insertData["data"] = data.data;
				insertData.created_at = Date.now();
				insertData.updated_at = Date.now();

				collection.insert(insertData, function(err, docs){
					if(err){
						console.error("err :", err);
						return;
					}
				});
			});
		}
	}
};