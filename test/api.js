var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3333");

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
			res.body.data.should.be.a("number");
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
			res.body.data.should.be.a("number");
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
			res.body.data.should.be.a("object");
			done();
		});
	});

	it("should return system infos",function(done){
		server
		.get("/api/system")
		.expect("Content-type",/json/)
		.expect(200) // HTTP OK
		.end(function(err,res){
			res.status.should.equal(200);
			res.body.success.should.equal(true);
			res.body.data.should.be.a("string");
			done();
		});
	});

	it("should return system architecture",function(done){
		server
		.get("/api/system/architecture")
		.expect("Content-type",/json/)
		.expect(200) // HTTP OK
		.end(function(err,res){
			res.status.should.equal(200);
			res.body.success.should.equal(true);
			res.body.data.should.be.a("string");
			done();
		});
	});

});
