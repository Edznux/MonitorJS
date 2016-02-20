var supertest = require("supertest");
var should = require("should");
var io = require('socket.io-client');

var server = supertest.agent("http://127.0.0.1:3000");

describe("WebSocket API unit test",function(){
	this.timeout(7000);
	var socket;
	var DATA;

	before(function(done) {
		// Setup
		socket = io.connect('http://localhost:3000', {
			'reconnection delay' : 0,
			'reopen delay' : 0,
			'force new connection' : true
		});
		socket.on('clients', function(data){
			DATA = data; 
			done();
		});
		socket.on('disconnect', function() {
			console.log('disconnected...');
		});
	});

	describe("Test General", function(){
		it("should return data over websocket",function(done){
			DATA.data.should.be.an.Array;
			done();
		});

		it("should return number of clients connected",function(done){
			DATA.clients.should.be.type("number");
			DATA.clients.should.be.above(0);
			done();
		});
	});

	describe("Test CPU", function(){
		
		it("should return cpu stats data",function(done){
			// console.log(DATA.data.cpu.infos.data);
			DATA.data.cpu.stats.success.should.equal(true);
			DATA.data.cpu.stats.data.should.be.type("object");
			DATA.data.cpu.stats.data[0].model.should.be.type("string");
			done();
		});

		it("should return cpu uptime", function(done){
			DATA.data.cpu.uptime.success.should.equal(true);
			DATA.data.cpu.uptime.data.should.be.type("number");
			DATA.data.cpu.uptime.data.should.be.a.above(0);
			done();
		});
		
		it("should return cpu times", function(done){
			DATA.data.cpu.stats.data[0].times.should.be.type("object");
			DATA.data.cpu.stats.data[0].times.should.be.type("object");

			DATA.data.cpu.stats.data[0].times.user.should.be.type("number");
			DATA.data.cpu.stats.data[0].times.nice.should.be.type("number");
			DATA.data.cpu.stats.data[0].times.sys.should.be.type("number");
			DATA.data.cpu.stats.data[0].times.idle.should.be.type("number");
			DATA.data.cpu.stats.data[0].times.irq.should.be.type("number");
			done();
		});

		it("should return cpu speed", function(done){
			DATA.data.cpu.stats.data[0].speed.should.be.type("number");
			DATA.data.cpu.stats.data[0].speed.should.be.above(0);
			done();
		});
	});

	describe("Test memory", function(){
		it("should return memory free", function(done){
			DATA.data.memory.free.success.should.be.equal(true);
			DATA.data.memory.free.data.should.be.type("number");
			done();
		});
		it("should return memory total", function(done){
			DATA.data.memory.total.success.should.be.equal(true);
			DATA.data.memory.total.data.should.be.type("number");
			done();
		});

		it("should return memory cached", function(done){
			DATA.data.memory.cached.success.should.be.equal(true);
			DATA.data.memory.cached.data.should.be.type("number");
			done();
		});
		it("should return memory buffers", function(done){
			DATA.data.memory.buffers.success.should.be.equal(true);
			DATA.data.memory.buffers.data.should.be.type("number");
			done();
		});
		it("should return memory inactive", function(done){
			DATA.data.memory.inactive.success.should.be.equal(true);
			DATA.data.memory.inactive.data.should.be.type("number");
			done();
		});
		it("should return memory active", function(done){
			DATA.data.memory.active.success.should.be.equal(true);
			DATA.data.memory.active.data.should.be.type("number");
			done();
		});
	});
	describe("Test disk", function(){
		
		it("should return disk available", function(done){
			DATA.data.disk.avail.success.should.be.equal(true);
			DATA.data.disk.avail.data.should.be.type("object");
			for(var i in DATA.data.disk.avail.data){
				DATA.data.disk.avail.data[i].should.be.type("number");
			}
			done();
		});

		it("should return disk size", function(done){
			DATA.data.disk.size.success.should.be.equal(true);
			DATA.data.disk.size.data.should.be.type("object");
			for(var i in DATA.data.disk.size.data){
				DATA.data.disk.size.data[i].should.be.type("number");
			}
			done();
		});
		
		it("should return disk usage", function(done){
			DATA.data.disk.used.success.should.be.equal(true);
			DATA.data.disk.used.data.should.be.type("object");
			for(var i in DATA.data.disk.used.data){
				DATA.data.disk.used.data[i].should.be.type("number");
			}
			done();
		});

		it("should return disk usage percentage", function(done){
			DATA.data.disk.use.success.should.be.equal(true);
			DATA.data.disk.use.data.should.be.type("object");
			for(var i in DATA.data.disk.use.data){
				DATA.data.disk.use.data[i].should.be.type("number");
			}
			done();
		});

		it("should return disk file system", function(done){
			DATA.data.disk.fileSystem.success.should.be.equal(true);
			DATA.data.disk.fileSystem.data.should.be.type("object");
			for(var i in DATA.data.disk.fileSystem.data){
				DATA.data.disk.fileSystem.data[i].should.be.type("string");
			}
			done();
		});

		it("should return disk mounted", function(done){
			DATA.data.disk.mounted.success.should.be.equal(true);
			DATA.data.disk.mounted.data.should.be.type("object");
			for(var i in DATA.data.disk.mounted.data){
				DATA.data.disk.mounted.data[i].should.be.type("string");
			}
			done();
		});
	});

	describe("Test network", function(){
		it("should return ping", function(done){
			DATA.data.network.ping.success.should.be.equal(true);
			DATA.data.network.ping.data.should.be.type("number");
			done();
		});

		it("should return rx packet number", function(done){
			DATA.data.network.rx.success.should.be.equal(true);
			DATA.data.network.rx.data.should.be.type("number");
			done();
		});

		it("should return tx packet number", function(done){
			DATA.data.network.tx.success.should.be.equal(true);
			DATA.data.network.tx.data.should.be.type("number");
			done();
		});

		it("should return interfaces", function(done){
			DATA.data.network.interfaces.success.should.be.equal(true);
			DATA.data.network.interfaces.data.should.be.type("object");
			done();
		});
	});
	
	describe("Test operating system", function(){
		it("should return os architecure", function(done){
			DATA.data.os.architecture.success.should.be.equal(true);
			DATA.data.os.architecture.data.should.be.type("string");
			DATA.data.os.architecture.data.should.match(/x64|arm|ia32/i);
			done();
		});
		it("should return os release", function(done){
			DATA.data.os.release.success.should.be.equal(true);
			DATA.data.os.release.data.should.be.type("string");
			done();
		});
		it("should return os type", function(done){
			DATA.data.os.type.success.should.be.equal(true);
			DATA.data.os.type.data.should.be.type("string");
			DATA.data.os.type.data.should.match(/linux|sunos|win32|freebsd|darwin/i);
			done();
		});
	});
});