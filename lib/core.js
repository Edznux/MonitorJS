var cpu = require("./cpu"),
    exec = require('child_process').exec,
    os = require("os"),
    fs = require("fs"),
    df = require('node-df');

/**
* delete all new line
*/
function ignoreNewLine(stdout){
    return stdout.replace(/\n/g,"");
}

/**
* async version for returning Memory information parsed form /proc/meminfo special file
* @parameters: callback
*/
function memory(callback) { //return Array of Array (bidimentionnal array) information on RAM
    fs.readFile("/proc/meminfo",'utf8', function(err, data) {
        if(err){
            console.log("read /proc/meminfo error: ", err);
            return callback(err, null);
        }
        var obj = {};
        var result = data.split(/\n|\r/); // check for any \r (new return);
        var tab = [];
        var multiplier;
        for (var i = 0; i < result.length - 1; i++) {
            if (result[i].length === 0) {
                result.splice(i, 1);
            }

            tab[i] = result[i].split(/:| +/);

            switch(tab[i][3]){
                case "B":
                    multiplier=1;
                break;
                case "kB":
                    multiplier=1024;
                break;
                default:
                    multiplier=1;
                    break;
            }
            obj[tab[i][0]] = (parseInt(tab[i][2]) * multiplier);
        }
        callback(err, obj);
    });
}

/**
* async version for returning Disk usage information parsed df command
* example df format:
*
* Filesystem     1K-blocks     Used Available Use% Mounted on
* simfs          314572800 41524596 273048204  14% /
* none             8388608        4   8388604   1% /dev
* none             1677724       56   1677668   1% /run
* none                5120        0      5120   0% /run/lock
* none             3355440        4   3355436   1% /run/shm
* none              102400        0    102400   0% /run/user
*
* @parameters: callback
*/
function Fdisk(callback) {
    df(function (error, response) {
        if (error) {
            return callback(error, {success: false, data: error});
        }
        return callback(null, response);
    });
}

/**
* read and parse logs selected in config file
* @parameters: callback
*
*/
function checkLogs(callback) {
    // console.log(conf.logsFiles[0]);
    var logs = conf.logsFiles;
    var result = [];
    for (var i = 0; i < logs.length; i++) {
        // console.log(logs.length)
        // console.log(logs[i])
    /*fs.readFile(logs[i], 'utf8', function(err, data) {
            if (err) {
                console.log('Error: ' + err);
                return;
            }+
            console.log(data);
            result[i] = data;
        });
    */
        result[i] = fs.readFileSync(logs[i], 'utf8');
    }
    callback(null,result);
}

function procCPU(callback){
    fs.readFile("/proc/cpuinfo",'utf8', function(err, data) {
        if(err){
            return callback(err, null);
        }
        data = data.replace(/\t/g, "");
        var tab = data.split(/\n/); // split every line into array;
        var result = {};
        var lineArr, prop, value;
        // for every line
        for (var i = 0; i < tab.length; i++) {
            lineArr = tab[i].split(/:/);
            prop = lineArr[0];
            value = lineArr[1] || "";

            // check if properties as a name (not blank line)
            if(prop.length !== 0){
                if(result[prop]){
                    result[prop].push(value.trim())
                }else{
                    result[prop] = [];    
                    result[prop].push(value.trim())
                }
            }
        }
        callback(null, result);
    });
}

/**
* Global object, all function auto routed
*/

monitor = {
    disk: { // read the output of df
        all: function diskAll(callback) {
            Fdisk(function(err, data) {
                if(err){
                    return callback({success: false, data: err});
                }
                callback(err, {success: true, data: data});
            });
        },
        fileSystem: function diskFs(callback) {
            Fdisk(function(err, data) {
                if(err){
                    return callback({success: false, data: err});
                }

                var result =[];
                for (var i = 0; i < data.length; i++) {
                    result[i] = data[i].filesystem;
                }
                callback(err, {success: true, data: result});
            });
        },
        size: function diskSize(callback) {
            Fdisk(function(err, data) {
                if(err){
                    return callback(err, {success: false, data: err});
                }

                var result =[];
                for (var i = 0; i < data.length; i++) {
                    result[i] = data[i].size;
                }
                callback(err, {success: true, data: result});
            });
        },
        used: function diskUsed(callback) {
            Fdisk(function(err, data) {
                if(err){
                    return callback({success: false, data: err});
                }

                var result =[];
                for (var i = 0; i < data.length; i++) {
                    result[i] = data[i].used;
                }
                callback(err, {success: true, data: result});
            });
        },
        avail: function diskAvail(callback) {
            Fdisk(function(err, data) {
                if(err){
                    return callback(err, {success: false, data: err});
                }
                var result =[];
                for (var i = 0; i < data.length; i++) {
                    result[i]=data[i].available;
                }
                callback(err, {success: true, data: result});
            });
        },
        use: function diskUse(callback) {
            Fdisk(function(err, data) {
                if(err){
                    return callback({success: false, data: err});
                }
                var result =[];
                for (var i = 0; i < data.length; i++) {
                    result[i]=data[i].capacity;
                }
                callback(err, {success: true, data: result});
            });
        },
        mounted: function diskMounted(callback) {
            Fdisk(function(err, data) {
                if(err){
                    return callback({success: false, data: err});
                }
                var result =[];
                for (var i = 0; i < data.length; i++) {
                    result[i]=data[i].mount;
                }
                callback(err,{success: true, data: result});
            });
        }
    },
    cpu: {
        uptime: function cpuUptime(callback) {
           callback(null, {success: true, data: os.uptime()});
        },
        load: function cpuLoad(callback) {
            var data = cpu(5);
            if(data === null){
                callback("Cpu load error", {success: false, data: null});
                return;
            }
            callback(null, {success: true, data: data}); // over 5 last seconds
        },
        stats: function cpuStats(callback) {
            callback(null, {success: true, data: os.cpus()});
        },
        infos: function cpuInfos(callback) {
            procCPU(function(err, data){
                if(err){
                    console.log(err);
                    callback(err,{success:false, data: null});
                    return;
                }
                callback(null,{success:true, data: data});
            });
        }
    },
    memory: {
        all: function memoryAll(callback) {
            memory(function(err, data) {
                if(err){
                    return callback(err, {success: false, data: err});
                }
                callback(err, {success: true, data: data});
            });
        },
        total: function memoryTotal(callback) {
            memory(function(err, data) {
                callback(null,{success: true, data :data.MemTotal});  // benchmark needed....
            });
            // callback(null, {success: true, data: os.totalmem()});
        },
        free: function memoryFree(callback) {
            memory(function(err, data) {
                callback(null,{success: true, data :data.MemFree});  // benchmark needed....
            });
            // callback(null, {success: true, data: os.freemem()});
        },
        cached: function memoryCached(callback) {
            memory(function(err, data) {
                if(err){
                    return callback({success: false, data: err});
                }
                callback(err, {success: true, data: parseInt(data.Cached)});
            });
        },
        buffers: function memoryBuffers(callback) {
            memory(function(err, data) {
                if(err){
                    return callback(err, {success: false, data: err});
                }
                callback(err, {success: true, data: parseInt(data.Buffers)});
            });
        },
        active: function memoryActive(callback) {
            memory(function(err, data) {
                if(err){
                    return callback(err, {success: false, data: err});
                }
                callback(err, {success: true, data: parseInt(data.Active)});
            });
        },
        inactive: function memoryInactive(callback) {
            memory(function(err, data) {
                if(err){
                    return callback(err, {success: false, data: err});
                }
                callback(err, {success: true, data: parseInt(data.Inactive)});
            });
        }
    },
    os: {
        release: function osRelease(callback) {
            fs.readFile("/proc/sys/kernel/osrelease",'utf8', function(err, data) {
                if(err){
                    return callback(err, {success: false, data: err});
                }
                callback(err, {success: true, data: ignoreNewLine(data)});
            });
        },
        architecture: function systemAchitecture(callback){
            callback(null, {success: true, data: os.arch()});
        },
        type: function systemType(callback){
            callback(null, {success: true, data: os.type()});
        }
    },
    network: {
        interfaces: function networkInterfaces(callback) {
            callback(null, {success: true, data: os.networkInterfaces()});
        },
        rx: function networkRx(callback) {
            fs.readFile("/sys/class/net/venet0/statistics/rx_bytes",'utf8', function(err, data) {
                if(err){
                    return callback(err, {success: false, data: err});
                }
                callback(err, {success: true, data: parseInt(ignoreNewLine(data))});
            });
        },
        tx: function networkTx(callback) {
            
            fs.readFile("/sys/class/net/venet0/statistics/tx_bytes",'utf8', function(err, data) {
                if(err){
                    return callback(err, {success: false, data: err});
                }
                callback(err, {success: true, data: parseInt(ignoreNewLine(data))});
            });
        },
        ping: function networkPing(callback) {
            exec("ping 8.8.8.8 -c1 | tail -1 | awk '{print $4}' | cut -d '/' -f 2", function(err, stdout, stderr) {
                if(err){

                    return callback(err, {success: false, data: err});
                }
                callback(err, {success: true, data: parseInt(ignoreNewLine(stdout))});
            });
        }
    }
};

module.exports = monitor;