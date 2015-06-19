mongoose = require('mongoose');

var DiskSchema = new mongoose.Schema({
    fileSystem: Number,
    size: Number,
    used: Number,
    avail: Number,
    use: Number,
    mounted: Number,
    updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Disk', DiskSchema);

