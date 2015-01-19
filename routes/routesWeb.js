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
	app.get('/disk', function(req, res) {
	    res.render('disk', {
	        namePage: "disk",
	        title: "Monitoring Disk",
	        clockGlobal:conf.perf.clockGlobal,
	        clockLogs: conf.perf.clockLogs,
	        ip:conf.IP
	    });
	});
	app.get('/cpu', function(req, res) {
	    res.render('cpu', {
	        namePage: "cpu",
	        title: "Monitoring CPU",
	        clockGlobal:conf.perf.clockGlobal,
	        clockLogs: conf.perf.clockLogs,
	        ip:conf.IP
	    });
	});
	app.get('/ram', function(req, res) {
	    res.render('ram', {
	        namePage: "ram",
	        title: "Monitoring RAM",
	        clockGlobal:conf.perf.clockGlobal,
	        clockLogs: conf.perf.clockLogs,
	        ip:conf.IP
	    });
	});
	app.get('/network', function(req, res) {
	    res.render('network', {
	        namePage: "network",
	        title: "Monitoring Network",
	        clockGlobal:conf.perf.clockGlobal,
	        clockLogs: conf.perf.clockLogs,
	        ip:conf.IP
	    });
	});
	app.get('/config', function(req, res) {
	    res.render('config', {
	        namePage: "config",
	        title: "config",
	        clockGlobal:conf.perf.clockGlobal,
	        clockLogs: conf.perf.clockLogs,
	        ip:conf.IP
	    });
	});
	app.get('/logs', function(req, res) {
	    res.render('logs', {
	        namePage: "logs",
	        title: "Logs",
	        clockGlobal:conf.perf.clockGlobal,
	        clockLogs: conf.perf.clockLogs,
	        ip:conf.IP
	    });
	});
	app.get('/demo', function(req, res) {
	    res.render('demo', {
	        namePage: "demo",
	        title: "demo",
	        clockGlobal:conf.perf.clockGlobal,
	        clockLogs: conf.perf.clockLogs,
	        ip:conf.IP
	    });
	});
}