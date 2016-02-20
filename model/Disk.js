var Waterline = require('waterline');
var mongo = require('sails-mongo');

var Disk = Waterline.Collection.extend({
	identity:"disk",
	adapters: 'sails-mongo',
	connection: ["myMongo"],
	attributes: {
		filesystem: {
			type: 'string',
			required: true
		},
		size:{
			type: 'integer',
			required: true
		},
		used:{
			type: 'integer',
			required: true
		},
		available:{
			type: 'integer',
			required: true
		},
		capacity:{
			type: 'integer',
			required: true
		},
		mount:{
			type: 'string',
			required: true
		},
		updated_at: { type: 'Date', default: Date.now },
		created_at: { type: 'Date', default: Date.now }
	}
});

module.exports = Disk;
