var conf = require("../config");

module.exports = function(app){
	app.get('/', function(req, res) {
		res.render('index', {
			namePage: "index",
			title: "Overall",
			clockGlobal:conf.perf.clockGlobal,
			clockLogs: conf.perf.clockLogs,
			ip:conf.IP
		});
	});
};
