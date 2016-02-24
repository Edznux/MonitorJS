var supertest = require("supertest");
var should = require("should");
var io = require('socket.io-client');

var server = supertest.agent("http://127.0.0.1:3000");

describe("HTTP API database unit test",function(){
	describe("CPU",function(){
		it("should return correctly stats",function(done){
			server
			.get("/api/cpu/stats/from/"+old)
			.expect("Content-type",/json/)
			.expect(200) // HTTP OK
			.end(function(err,res){
				console.log("/api/cpu/stats/from/"+old);
				res.status.should.equal(200);
				res.body.success.should.equal(true);
				res.body.data.should.be.a.Array;
				done();
			});
		});
		it("should return correctly load",function(done){
			server
			.get("/api/cpu/load/from/"+old)
			.expect("Content-type",/json/)
			.expect(200) // HTTP OK
			.end(function(err,res){
				console.log("/api/cpu/stats/from/"+old);
				res.status.should.equal(200);
				res.body.success.should.equal(true);
				res.body.data.should.be.a.Array;
				done();
			});
		});
	});
});