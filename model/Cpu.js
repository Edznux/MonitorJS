mongoose = require('mongoose');

var CpuSchema = new mongoose.Schema({
    load: {type: Number, min :0, max:100},
    stats: {type : String},
    updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now }
});

var Cpu = mongoose.model('Cpu', CpuSchema);
module.exports = Cpu;

var store = function(){
	var returnedData = {};
	var needed = ['load','stats'];
	var callbackNeeded = needed.length;

	for(var i = 0; i<needed.length; i++){
		monitor['cpu'][needed[i]](function(data){
			console.log(data);
			returnedData[needed[i]] = data;
			callbackNeeded--;

			if(callbackNeeded === 0){
				var cpu = new Cpu({
					total : returnedData.total,
					stats : returnedData.stats
				});

				cpu.save(function(err, data) {
					if (err){
						return console.error(err);
					} 
				});
			}
		});
	}

}

module.exports.store = store;