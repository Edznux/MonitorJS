module.exports = function(monitor){
	monitor.logs={};
	monitor.logs.all=function(callback){
		callback("logs blblbl");
	};
};