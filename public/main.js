var socket = io.connect();
var g = new JustGage({
    id: "gauge",
    value: 67,
    min: 0,
    max: 100,
    title: "Visitors"
});
socket.on('data', function(data) {
    document.getElementById('diskAll').innerHTML = data.diskAll;
    document.getElementById('fileSystem').innerHTML = data.fileSystem;
    document.getElementById('size').innerHTML = data.size;
    document.getElementById('used').innerHTML = data.used;
    document.getElementById('avail').innerHTML = data.avail;
    document.getElementById('use').innerHTML = data.use;
    document.getElementById('mounted').innerHTML = data.mounted;
    document.getElementById('cpu').innerHTML = data.cpu;
    document.getElementById('uptime').innerHTML = data.uptime;
    document.getElementById('total').innerHTML = data.total;
    document.getElementById('free').innerHTML = data.free;
    document.getElementById('cached').innerHTML = data.cached;
    document.getElementById('buffers').innerHTML = data.buffers;
    document.getElementById('active').innerHTML = data.active;
    document.getElementById('inactive').innerHTML = data.inactive;
    document.getElementById('rx').innerHTML = data.rx;
    document.getElementById('tx').innerHTML = data.tx;
});