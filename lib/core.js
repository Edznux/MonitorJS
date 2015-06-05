var cpu = require("./cpu"),
    exec = require('child_process').exec,
    os = require("os");
/**
* replace all new line by nothing
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
        callback(tab);
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
        callback(result);
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
    callback(result);
}

/**
* Global object, all function auto routed 
*/

monitor = {
    disk: { // read the output of df
        all: function(callback) {
            Fdisk(function(data) {
                callback(data);
            });
        },
        fileSystem: function(callback) {
            Fdisk(function(data) {
                var result =[];
                for (var i = 0; i < data.length; i++) {
                    result[i] = data[i][0];
                }
                result.shift();                             // shifting first value : title of column
                callback(result);
            });
        },
        size: function(callback) {
            Fdisk(function(data) {
                var result =[];
                for (var i = 1; i < data.length; i++) {
                    result[i] =data[i][1];
                }
                result.shift();
                callback(result);
            });
        },
        used: function(callback) {
            Fdisk(function(data) {
                var result =[];
                for (var i = 1; i < data.length; i++) {
                    result[i] = data[i][2];
                }
                result.shift();
                callback(result);
            });
        },
        avail: function(callback) {
            Fdisk(function(data) {
                var result =[];
                for (var i = 1; i < data.length; i++) {
                    result[i]=data[i][3];
                }
                result.shift();
                callback(result);
            });
        },
        use: function(callback) {
            Fdisk(function(data) {
                var result =[];
                for (var i = 1; i < data.length; i++) {
                    result[i]=data[i][4];
                }
                result.shift();
                callback(result);
            });
        },
        mounted: function(callback) {
            Fdisk(function(data) {
                var result =[];
                for (var i = 1; i < data.length; i++) {
                    result[i]=data[i][5];
                }
                result.shift();
                callback(result);
            });
        }
    },
    cpu: {
        uptime: function(callback) {
           callback(os.uptime())
        },
        load: function(callback) {
            callback(cpu(5)); // over 5 last seconds
        },
        stats: function(callback) {
            callback(os.cpus());
        },
        infos: function(callback) {
            exec("cat /proc/cpuinfo", function(err, stdout, stderr) {
                var tab = stdout.split(/\n/); // check \n (new line);
                var result = [];
                for (var i = 0; i < tab.length; i++) {
                    result[i] = tab[i].split(/:/); // for any space
                    if (tab[i].length == 0) {
                        tab.splice(i, 1);
                    }
                };
                callback(result)
            });
        }
    },
    memory: {
        all: function(callback) {
            memory(function(data) {
                callback(data);
            });
        },
        total: function(callback) {
            // memory(function(data) {
            //     callback(data[0][1]);  // benchmark needed....
            // });
            callback(os.totalmem())
        },
        free: function(callback) {
            callback(os.freemem())
        },
        cached: function(callback) {
            memory(function(data) {
                callback(data[2][1]);
            });
        },
        buffers: function(callback) {
            memory(function(data) {
                callback(data[3][1]);
            });
        },
        active: function(callback) {
            memory(function(data) {
                callback(data[4][1]);
            });
        },
        inactive: function(callback) {
            memory(function(data) {
                callback(data[5][1]);
            });
        }
    },
    os: {
        release: function(callback) {
            exec("cat /proc/sys/kernel/osrelease", function(err, stdout, stderr) {
                callback(ignoreNewLine(stdout));
            });
        },
        type: function(callback) {
            exec("cat /proc/sys/kernel/ostype", function(err, stdout, stderr) {
                callback(ignoreNewLine(stdout));
            });
        }
    },
    network: {
        interfaces: function(callback) {
            callback(os.networkInterfaces())
        },
        rx: function(callback) {
            exec("cat /sys/class/net/venet0/statistics/rx_bytes", function(err, stdout, stderr) {
                callback(ignoreNewLine(stdout));
            });
        },
        tx: function(callback) {
            exec("cat /sys/class/net/venet0/statistics/tx_bytes", function(err, stdout, stderr) {
                callback(ignoreNewLine(stdout));
            });
        },
        ping: function(callback) {
            exec('ping 8.8.8.8 -c1 | grep -i "time="', function(err, stdout, stderr) {
                callback(ignoreNewLine(stdout));
            });
        }
    }
}

module.exports = monitor;