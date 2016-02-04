var Waterline = require('waterline');
var mongo = require('sails-mongo');

var Disk = Waterline.Collection.extend({
	adapters: 'sails-mongo',
	attributes: {
		fileSystem: Number,
		size: Number,
		used: Number,
		avail: Number,
		use: Number,
		mounted: Number,
		updated_at: { type: Date, default: Date.now },
		created_at: { type: Date, default: Date.now }
	}
});

module.exports = Disk;
