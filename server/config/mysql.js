/**
 * Created by tkulish on 6/9/2014.
 */

var mysql =  require('mysql');

module.exports = function (config) {
    console.log("Connecting to MySQL");
    var connection = mysql.createConnection({
       host: config.dbHost,
       user: config.dbUser,
       password: config.dbPassword,
       database: config.dbDatabase,
       insecureAuth: true
    });
    connection.connect(function(err) {
        if(err) { console.log("Unable to connect to MySQL: " + err); }
        else {
            console.log("Connected...");
        }
    });

    var queryString = "SELECT * FROM system_users WHERE status < '5' and site_id = '1'";

    connection.query(queryString, function(err, rows, fields) {
        if (err) throw err;

        for (var i in rows) {
            console.log('Users: ', rows[i].user_name);
        }
    });

    connection.end();

};