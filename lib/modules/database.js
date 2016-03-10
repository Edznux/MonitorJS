var config	= require("../../config");
var monitor = require("../core.js");
var mongo = require('sails-mongo');
var MongoClient = require('mongodb').MongoClient;

module.exports = function(app){
	var db;

	if(config.DB.enable){
		init();
	}else{
		//exit early if database is not enabled in config;
		return;
	}

	// Make an array of data that you want to save
	var whitelist = {
						"disk":["all"],
						"cpu":["load", "stats"],
						"network":["rx","tx","interfaces", "ping"],
						"memory":["all"]
					};
	
	/*
	* Routing method 
	*/
	app.get('/api/:parts/:name/from/:from/to/:to', function(req, res) {
		console.log(1);
		sendDb(req, res);
	});
	app.get('/api/:parts/:name/from/:from', function(req, res) {
		sendDb(req, res);
		console.log(2);
	});


	/*
	* Initialise the database addon.
	* Setup connection to mongodb database
	*/
	function init(){
		MongoClient.connect('mongodb://127.0.0.1:27017/monitor', function(err, database) {
			if(err){
				console.error("Database connection error :",err);
				throw err;
			}
			db=database;
		});
		
		setInterval(function(){
			loopData();
		}, config.perf.clockSave);
	}

	/**
	* Loop over all whitelist item
	* call the saveData function to save each one
	*/
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
	/**
	* Save current value of one item of a categorie (route)
	* into mongo db
	*/
	function saveData(route, item){
		// save model with "all" data
		var insertData, collection;
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
	/*
	* get data from the database between "from" and "to" timestamp
	* callaback :
	*	- err
	*	- documents
	*/
	function getData(route, item, from, to, callback){
		var collection;
		if(whitelist[route].indexOf(item) >= -1){
			collection = db.collection(route+""+item);
			collection.find({"created_at" : {"$gt":from, "$lt": to}}).limit(500).toArray(function(err,docs){
				if(err){
					console.error("error : ", err);
					return callback("Error in db query", null);
				}
				return callback(null, docs);
			});
		}else{
			return callback("Item or category not found", null);
		}
	}
	/*
	* send to user all the data
	* @params :
	* - req : express request
	* - res : express response
	*/
	function sendDb(req, res) {
		var from, to;
		var route = req.params.parts;
		var item = req.params.name;
		
		// query timestamps
		if(req.params.from){
			from = parseInt(req.params.from);
		}
		if(req.params.to){
			to = parseInt(req.params.to);
		}else{
			to = Date.now();
		}

		/*
		* Check if data is available throught the withelist
		*/
		if(whitelist[route]){
			if(whitelist[route].indexOf(item) >= -1){
				getData(route, item, from, to, function(err, data){
					if(err){
						console.error(err);
						throw err;
					}
					res.send(JSON.stringify({"success" : true, "data" : data}));
				});
			}else{
				res.send(JSON.stringify({'success':false, 'data':"INVALID properties"}));
			}
		}else{
			res.send(JSON.stringify({'success': false, 'data':"INVALID type"}));
		}
	}
};