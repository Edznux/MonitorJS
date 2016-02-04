var Waterline = require('waterline');
var mongo = require('sails-mongo');


var Memory = Waterline.Collection.extend({
	adapters: 'sails-mongo',
	attributes: {
		total: Number,
		free: Number,
		cached: Number,
		buffers: Number,
		active: Number,
		inactive: Number,
		updated_at: { type: Date, default: Date.now },
		created_at: { type: Date, default: Date.now }
	}
});


module.exports = Memory;