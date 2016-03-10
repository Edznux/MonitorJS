var config = require('../../config');

module.exports = function(monitor){
	monitor.analytics={};
	monitor.analytics.pageview=function(callback){
		callback(null,{success : true, data: "logs blblbl"});
	};
};

/*
* Sessions
* 
* 
*/