var conf = require("../config");

module.exports = function(app){
	app.get(["/api","/api/*"],function (req, res, next) {
		res.contentType('application/json');
		next();
	});

	function sendApi(route,item,req,res){
		if(monitor.hasOwnProperty(route)){                      // check if the object have any sub object name route, (cpu, memory, network ...) and reject it if not
			if(monitor[route].hasOwnProperty(item)){            // check if the method have any sub object name route like all, cached, active... and  reject it if not
				monitor[route][item](function(err, data){
					res.send(JSON.stringify(data));
				});
			}else{
				res.send(JSON.stringify({'success':false, 'data':"INVALID properties"}));
			}
		}else{
			res.send(JSON.stringify({'success': false, 'data':"INVALID type"}));
		}
	}

	function setConf(type,name,req,res){
/*		console.log(name);
		console.log(value);
		console.log(conf.IP);
		conf.IP = value;
*/
		if(conf.hasOwnProperty(type)){
			if(conf[type].hasOwnProperty(name)){
				if(process.env[type]===undefined){
					process.env[type]={};
					process.env[type][name] = JSON.stringify(req.body)[name];
					// process.env[type][name]
				}else{
					process.env[type][name] = JSON.stringify(req.body)[name] ;
				}
			}
		}
	}
	app.get('/api', function(req, res) {
		res.send(JSON.stringify({success : true, data : "Documentation available at https://github.com/edznux/monitorjs"}));
	});

	//call "sendApi" function with parts and name of object requested
	app.get('/api/:parts/:name', function(req, res) {
		sendApi(req.params.parts, req.params.name, req, res);
	});

	app.get("/api/alert",function(req, res) {
		res.send(JSON.stringify({success: 'action succeed' ,info:'Your server have been rebooted', warning : 'Your server is heavily charged', error:'Your server is actually OVERLOADED'}));
	});

	app.post('/api/config',function(req, res) {
		setConf(req.params.type, req.params.name, req, res);
	});

};