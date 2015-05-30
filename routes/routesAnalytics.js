var conf = require("../config");
module.exports = function(app){
	
	app.get('/pixel.png', function(req, res) {
		var path = req.query.p;
		var website = req.query.website;
		var type = req.query.t;
		var screenResolution = req.query.sr;
		var viewPort = req.query.vp;
		var pageName = req.query.pn;
		var timestamp = req.query.ts;
		var referer = req.query.referer;
		var userLang = req.query.ul;
		var loadTime = req.query.lt;
		var DOMTime = req.query.dt;
		var ua = req.headers['user-agent'];
		console.log('DOMTime',DOMTime,"loadTime",loadTime);
		/**
		* Browser detection (name + version)
		*/
		var browser = {};
		if(ua.match(/Firefox\//)){
			browser.name = 'Firefox';
			console.log("Firefox");
			// browser.version = /Firefox\/([0-9\.]+)]/.exec(ua);
			console.log(browser.version);
		} 

		//send the pixel image (1x1 png)
		sendPixel(res);
	});

	app.get('/analytics/view', function(req, res) {
		var path = req.query.path;
		var website = req.query.website;
		// res.send('path ' + path + ' website ' + website);
	});

	app.get('/analytics/clics', function(req, res) {
		var path = req.query.path;
		var website = req.query.website;
		res.send('path ' + path + ' website ' + website);
	});

	function sendPixel(res){
		res.sendFile(__dirname+'/pixel.png');
	}
};