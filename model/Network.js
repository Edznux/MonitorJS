var Waterline = require('waterline');
var mongo = require('sails-mongo');

var Network = Waterline.Collection.extend({
	adapters: 'sails-mongo',
	attributes: {
		rx: Number,
		tx: Number,
		ping: Number,
		updated_at: { type: Date, default: Date.now },
		created_at: { type: Date, default: Date.now }
	}
});

module.exports = Network;