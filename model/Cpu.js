var Waterline = require('waterline');
var mongo = require('sails-mongo');


var Cpu = Waterline.Collection.extend({
	adapters: 'sails-mongo',
	attributes: {
		load: {
			type: Number,
			min :0,
			max:100
		},
		stats: {
			type : String
		},
		updated_at: {
			type: Date,
			default: Date.now
		},
		created_at: {
			type: Date,
			default: Date.now
		}
	}
});

module.exports = Cpu;