var mysql= require('mysql');
var conf = require('../../config');
console.log("message");
module.exports = function(query){
    if(conf.DB.type=="mysql"){
        var connection = mysql.createConnection({
        host     : conf.DB.host,
        user     : conf.DB.user,
        database : conf.DB.database,
        password : conf.DB.password
    });
    dataBaseType="mysql";
    connection.connect();
    // connection.query('SELECT * FROM `CPU` WHERE 1 ', function(err, rows, fields) {
    //   if (err) throw err;
    //   // console.log(rows[0].infos);
    // });

    // connection.end();
    }
}