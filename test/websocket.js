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
			DATA.clients.should.be.above(1);
			done();
		});
	});

	describe("Test CPU", function(){
		
		it("should return cpu stats data",function(done){
			// console.log(DATA.data.cpuinfos.data);
			DATA.data.cpustats.success.should.equal(true);
			DATA.data.cpustats.data.should.be.type("object");
			DATA.data.cpustats.data[0].model.should.be.type("string");
			done();
		});

		it("should return cpu uptime", function(done){
			DATA.data.cpuuptime.success.should.equal(true);
			DATA.data.cpuuptime.data.should.be.type("number");
			DATA.data.cpuuptime.data.should.be.a.above(0);
			done();
		});
		
		it("should return cpu times", function(done){
			DATA.data.cpustats.data[0].times.should.be.type("object");
			DATA.data.cpustats.data[0].times.should.be.type("object");

			DATA.data.cpustats.data[0].times.user.should.be.type("number");
			DATA.data.cpustats.data[0].times.nice.should.be.type("number");
			DATA.data.cpustats.data[0].times.sys.should.be.type("number");
			DATA.data.cpustats.data[0].times.idle.should.be.type("number");
			DATA.data.cpustats.data[0].times.irq.should.be.type("number");
			done();
		});

		it("should return cpu speed", function(done){
			DATA.data.cpustats.data[0].speed.should.be.type("number");
			DATA.data.cpustats.data[0].speed.should.be.above(0);
			done();
		});
	});

	describe("Test memory", function(){
		it("should return memory free", function(done){
			DATA.data.memoryfree.success.should.be.equal(true);
			DATA.data.memoryfree.data.should.be.type("number");
			done();
		});
		it("should return memory total", function(done){
			DATA.data.memorytotal.success.should.be.equal(true);
			DATA.data.memorytotal.data.should.be.type("number");
			done();
		});

		it("should return memory cached", function(done){
			DATA.data.memorycached.success.should.be.equal(true);
			DATA.data.memorycached.data.should.be.type("number");
			done();
		});
		it("should return memory buffers", function(done){
			DATA.data.memorybuffers.success.should.be.equal(true);
			DATA.data.memorybuffers.data.should.be.type("number");
			done();
		});
		it("should return memory inactive", function(done){
			DATA.data.memoryinactive.success.should.be.equal(true);
			DATA.data.memoryinactive.data.should.be.type("number");
			done();
		});
		it("should return memory active", function(done){
			DATA.data.memoryactive.success.should.be.equal(true);
			DATA.data.memoryactive.data.should.be.type("number");
			done();
		});
	});
	describe("Test disk", function(){
		
		it("should return disk available", function(done){
			DATA.data.diskavail.success.should.be.equal(true);
			DATA.data.diskavail.data.should.be.type("object");
			for(var i in DATA.data.diskavail.data){
				DATA.data.diskavail.data[i].should.be.type("number");
			}
			done();
		});

		it("should return disk size", function(done){
			DATA.data.disksize.success.should.be.equal(true);
			DATA.data.disksize.data.should.be.type("object");
			for(var i in DATA.data.disksize.data){
				DATA.data.disksize.data[i].should.be.type("number");
			}
			done();
		});
		
		it("should return disk usage", function(done){
			DATA.data.used.success.should.be.equal(true);
			DATA.data.used.data.should.be.type("object");
			for(var i in DATA.data.used.data){
				DATA.data.used.data[i].should.be.type("number");
			}
			done();
		});

		it("should return disk usage percentage", function(done){
			DATA.data.use.success.should.be.equal(true);
			DATA.data.use.data.should.be.type("object");
			for(var i in DATA.data.use.data){
				DATA.data.use.data[i].should.be.type("number");
			}
			done();
		});

		it("should return disk file system", function(done){
			DATA.data.diskfileSystem.success.should.be.equal(true);
			DATA.data.diskfileSystem.data.should.be.type("object");
			for(var i in DATA.data.diskfileSystem.data){
				DATA.data.diskfileSystem.data[i].should.be.type("string");
			}
			done();
		});

		it("should return disk mounted", function(done){
			DATA.data.diskmounted.success.should.be.equal(true);
			DATA.data.diskmounted.data.should.be.type("object");
			for(var i in DATA.data.diskmounted.data){
				DATA.data.diskmounted.data[i].should.be.type("string");
			}
			done();
		});
	});

	describe("Test network", function(){
		it("should return ping", function(done){
			DATA.data.networkping.success.should.be.equal(true);
			DATA.data.networkping.data.should.be.type("number");
			done();
		});

		it("should return rx packet number", function(done){
			DATA.data.networkrx.success.should.be.equal(true);
			DATA.data.networkrx.data.should.be.type("number");
			done();
		});

		it("should return tx packet number", function(done){
			DATA.data.networktx.success.should.be.equal(true);
			DATA.data.networktx.data.should.be.type("number");
			done();
		});

		it("should return interfaces", function(done){
			DATA.data.networktx.success.should.be.equal(true);
			DATA.data.networktx.data.should.be.type("object");
			done();
		});
	});
	
	describe("Test operating system", function(){
		it("should return os architecure", function(done){
			DATA.data.osarchitecture.success.should.be.equal(true);
			DATA.data.osarchitecture.data.should.be.type("string");
			DATA.data.osarchitecture.data.should.match(/x64|arm|ia32/i);
			done();
		});
		it("should return os release", function(done){
			DATA.data.osrelease.success.should.be.equal(true);
			DATA.data.osrelease.data.should.be.type("string");
			done();
		});
		it("should return os type", function(done){
			DATA.data.ostype.success.should.be.equal(true);
			DATA.data.ostype.data.should.be.type("string");
			DATA.data.ostype.data.should.match(/linux|sunos|win32|freebsd|darwin/i);
			done();
		});
	});
});