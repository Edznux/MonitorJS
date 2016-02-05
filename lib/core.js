var cpu = require("./cpu"),
    exec = require('child_process').exec,
    os = require("os"),
    async = require("async");

/**
* delete all new line
*/
function ignoreNewLine(stdout){
    return stdout.replace(/\n/g,"");
}

/**
* async version for returning Memory information parsed form /proc/meminfo special file
* @parameters : callback
*/
function memory(callback) { //return Array of Array (bidimentionnal array) information on RAM
    exec("cat /proc/meminfo", function(err, stdout, stderr) {
        var result = stdout.split(/\n|\r/); // check for any \r (new return);
        var tab = [];
        for (var i = 0; i < result.length - 1; i++) {
            if (result[i].length == 0) {
                result.splice(i, 1);
            }
            tab[i] = result[i].split(/ +/);
        };
        callback(err, tab);
    });
}

/**
* async version for returning Disk usage information parsed df command
* @parameters : callback
*/
function Fdisk(callback) { //return Array of Array (bidimentionnal array) of Disk information
    exec("df -h", function(err, stdout, stderr) {
        var clearification = stdout.replace("Mounted on", "Mounted");
        var tab = clearification.split(/\n|\r/); // check for any space or \n (new line);
        tab.pop();
        var result = [];
        for (var i = 0; i < tab.length; i++) {
            result[i] = tab[i].split(/ +/);
        }
        callback(err, result);
    });
}
/**
* read and parse logs selected in config file
* @parameters : callback
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
    };
    callback(null,result);
}

/**
* Global object, all function auto routed 
*/

monitor = {
    disk: { // read the output of df
        all: function diskAll(callback) {
            Fdisk(function(err, data) {
                callback(err,data);
            });
        },
        fileSystem: function diskFs(callback) {
            Fdisk(function(err, data) {
                var result =[];
                for (var i = 0; i < data.length; i++) {
                    result[i] = data[i][0];
                }
                result.shift();                             // shifting first value : title of column
                callback(err, result);
            });
        },
        size: function diskSize(callback) {
            Fdisk(function(err, data) {
                var result =[];
                for (var i = 1; i < data.length; i++) {
                    result[i] =data[i][1];
                }
                result.shift();
                callback(err, result);
            });
        },
        used: function diskUsed(callback) {
            Fdisk(function(err, data) {
                var result =[];
                for (var i = 1; i < data.length; i++) {
                    result[i] = data[i][2];
                }
                result.shift();
                callback(err, result);
            });
        },
        avail: function diskAvail(callback) {
            Fdisk(function(err, data) {
                var result =[];
                for (var i = 1; i < data.length; i++) {
                    result[i]=data[i][3];
                }
                result.shift();
                callback(err, result);
            });
        },
        use: function diskUse(callback) {
            Fdisk(function(err, data) {
                var result =[];
                for (var i = 1; i < data.length; i++) {
                    result[i]=data[i][4];
                }
                result.shift();
                callback(err, result);
            });
        },
        mounted: function diskMounted(callback) {
            Fdisk(function(err, data) {
                var result =[];
                for (var i = 1; i < data.length; i++) {
                    result[i]=data[i][5];
                }
                result.shift();
                callback(err,result);
            });
        }
    },
    cpu: {
        uptime: function cpuUptime(callback) {
           callback(null,os.uptime());
        },
        load: function cpuLoad(callback) {
            callback(null,cpu(5)); // over 5 last seconds
        },
        stats: function cpuStats(callback) {
            callback(null,os.cpus());
        },
        infos: function cpuInfos(callback) {
            exec("cat /proc/cpuinfo", function(err, stdout, stderr) {
                var tab = stdout.split(/\n/); // check \n (new line);
                var result = [];
                for (var i = 0; i < tab.length; i++) {
                    result[i] = tab[i].split(/:/); // for any space
                    if (tab[i].length == 0) {
                        tab.splice(i, 1);
                    }
                };
                callback(err, result);
            });
        }
    },
    memory: {
        all: function memoryAll(callback) {
            memory(function(err, data) {
                callback(null,data);
            });
        },
        total: function memoryTotal(callback) {
            // memory(function(data) {
            //     callback(null,data[0][1]);  // benchmark needed....
            // });
            callback(null, os.totalmem());
        },
        free: function memoryFree(callback) {
            callback(null, os.freemem());
        },
        cached: function memoryCached(callback) {
            memory(function(err, data) {
                callback(null, data[2][1]);
            });
        },
        buffers: function memoryBuffers(callback) {
            memory(function(err, data) {
                callback(err, data[3][1]);
            });
        },
        active: function memoryActive(callback) {
            memory(function(err, data) {
                callback(err, data[4][1]);
            });
        },
        inactive: function memoryInactive(callback) {
            memory(function(err, data) {
                callback(err, data[5][1]);
            });
        }
    },
    os: {
        release: function osRelease(callback) {
            exec("cat /proc/sys/kernel/osrelease", function(err, stdout, stderr) {
                callback(err, ignoreNewLine(stdout));
            });
        },
        type: function osType(callback) {
            exec("cat /proc/sys/kernel/ostype", function(err, stdout, stderr) {
                callback(err, ignoreNewLine(stdout));
            });
        }
    },
    network: {
        interfaces: function networkInterfaces(callback) {
            callback(null, os.networkInterfaces())
        },
        rx: function networkRx(callback) {
            exec("cat /sys/class/net/venet0/statistics/rx_bytes", function(err, stdout, stderr) {
                callback(err, ignoreNewLine(stdout));
            });
        },
        tx: function networkTx(callback) {
            exec("cat /sys/class/net/venet0/statistics/tx_bytes", function(err, stdout, stderr) {
                callback(err, ignoreNewLine(stdout));
            });
        },
        ping: function networkPing(callback) {
            exec('ping 8.8.8.8 -c1 | grep -i "time="', function(err, stdout, stderr) {
                callback(err, ignoreNewLine(stdout));
            });
        }
    }
};

module.exports = monitor;