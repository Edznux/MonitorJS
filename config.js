var config 	={};
config.DB 	={};
config.auth 	={};
config.notify 	={};
config.perf 	={};

/* Global Api configuration*/
config.IP 		= "111.222.33.44";
config.logFiles = ["/var/log/mongodb.log","/var/log/dpkg.log"];

/* Authentification configuration if config.auth.enable is false, login and password are ignored */
config.auth.enable 	= true;
config.auth.login 	= "login";
config.auth.password= "password";

/* Database configuration for saving all data */
config.DB.type 		= "mysql";
config.DB.host 		= "localhost";
config.DB.user 		= "user";
config.DB.database 	= "monitor";
config.DB.password 	= "pass";

/* Notification services*/
config.notify.email = "yourmail@example.com";

/* performance settings */
config.perf.clockGlobal = 1000; // 2sec
config.perf.clockLogs 	= 30000; // 30sec for reloading logs files
config.perf.clockSave 	= 60000; // 60sec for saving in database

module.exports = config;
