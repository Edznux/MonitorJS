mongoose = require('mongoose');

var NetworkSchema = new mongoose.Schema({
    rx: Number,
    tx: Number,
    ping: Number,
    updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('NetworkSchema', NetworkSchema);
