var supertest = require("supertest");
var should = require("should");
var io = require('socket.io-client');

var server = supertest.agent("http://127.0.0.1:3000");

describe("HTTP API unit test",function(){

	it("should return home page",function(done){
		server
		.get("/api")
		.expect("Content-type",/json/)
		.expect(200) // HTTP OK
		.end(function(err,res){
			res.status.should.equal(200);
			res.body.success.should.equal(true);
			done();
		});
	});

	it("should return global memory infos",function(done){
		server
		.get("/api/memory")
		.expect("Content-type",/json/)
		.expect(200) // HTTP OK
		.end(function(err,res){
			res.status.should.equal(200);
			res.body.success.should.equal(true);
			res.body.data.should.be.an("object");
			res.body.data.should.have.length.of.at.least(1);
			done();
		});
	});

	it("should return free memory infos",function(done){
		server
		.get("/api/memory/free")
		.expect("Content-type",/json/)
		.expect(200) // HTTP OK
		.end(function(err,res){
			res.status.should.equal(200);
			res.body.success.should.equal(true);
			res.body.data.should.be.a.Number;
			done();
		});
	});

	it("should return total memory infos",function(done){
		server
		.get("/api/memory/total")
		.expect("Content-type",/json/)
		.expect(200) // HTTP OK
		.end(function(err,res){
			res.status.should.equal(200);
			res.body.success.should.equal(true);
			res.body.data.should.be.a.Number;
			done();
		});
	});

	it("should return cached memory infos",function(done){
		server
		.get("/api/memory/cached")
		.expect("Content-type",/json/)
		.expect(200) // HTTP OK
		.end(function(err,res){
			res.status.should.equal(200);
			res.body.success.should.equal(true);
			res.body.data.should.be.a.Number;
			done();
		});
	});

	it("should return buffers memory infos",function(done){
		server
		.get("/api/memory/buffers")
		.expect("Content-type",/json/)
		.expect(200) // HTTP OK
		.end(function(err,res){
			res.status.should.equal(200);
			res.body.success.should.equal(true);
			res.body.data.should.be.a.Number;
			done();
		});
	});

	it("should return active memory infos",function(done){
		server
		.get("/api/memory/active")
		.expect("Content-type",/json/)
		.expect(200) // HTTP OK
		.end(function(err,res){
			res.status.should.equal(200);
			res.body.success.should.equal(true);
			res.body.data.should.be.a.Number;
			done();
		});
	});

	it("should return inactive memory infos",function(done){
		server
		.get("/api/memory/inactive")
		.expect("Content-type",/json/)
		.expect(200) // HTTP OK
		.end(function(err,res){
			res.status.should.equal(200);
			res.body.success.should.equal(true);
			res.body.data.should.be.a.Number;
			done();
		});
	});

	it("should return cpu infos",function(done){
		server
		.get("/api/cpu")
		.expect("Content-type",/json/)
		.expect(200) // HTTP OK
		.end(function(err,res){
			res.status.should.equal(200);
			res.body.success.should.equal(true);
			res.body.data.should.be.a.Object;
			done();
		});
	});

	it("should return os infos",function(done){
		server
		.get("/api/os")
		.expect("Content-type",/json/)
		.expect(200) // HTTP OK
		.end(function(err,res){
			res.status.should.equal(200);
			res.body.success.should.equal(true);
			res.body.data.should.be.a.String;
			done();
		});
	});

	it("should return os architecture",function(done){
		server
		.get("/api/os/architecture")
		.expect("Content-type",/json/)
		.expect(200) // HTTP OK
		.end(function(err,res){
			res.status.should.equal(200);
			res.body.success.should.equal(true);
			res.body.data.should.be.a.String;
			done();
		});
	});
});