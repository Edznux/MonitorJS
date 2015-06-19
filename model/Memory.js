var mongoose = require('mongoose');

var MemorySchema = new mongoose.Schema({
    total: Number,
    free: Number,
    cached: Number,
    buffers: Number,
    active: Number,
    inactive: Number,
    updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now }
});

var Memory =  mongoose.model('Memory', MemorySchema);

module.exports = Memory;

var store = function(){
	var returnedData = {};
	var needed = ['total','free','cached','buffers','active','inactive'];
	var callbackNeeded = needed.length;

	for(var i = 0; i<needed.length; i++){
		monitor['memory'][needed[i]](function(data){
			returnedData[needed[i]] = data;
			callbackNeeded--;

			if(callbackNeeded === 0){
				var memory = new Memory({
					total : returnedData.total,
					free : returnedData.free,
					cached : returnedData.cached,
					buffers : returnedData.buffers,
					active : returnedData.active,
					inactive : returnedData.inactive,
				});

				memory.save(function(err, data) {
					if (err){
						return console.error(err);
					} 
				});
			}
		});
	}

}

module.exports.store = store;