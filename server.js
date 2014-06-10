var http = require('http');
//var path = require('path');
//var async = require('async');
var socketio = require('socket.io');
var express = require('express');
//var stylus = require('stylus');
var mysql =  require('mysql');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var env = process.env.NODE_ENV = process.env.NODE_ENV  || 'development';
var app     = express();
var config  = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/mysql')(config);

passport.use(new LocalStrategy(
    function(username, password, done) {
        var connection = mysql.createConnection({
            host: config.dbHost,
            user: config.dbUser,
            password: config.dbPassword,
            database: config.dbDatabase,
            insecureAuth: true
        });
        var key = username;
        var userQuery = "SELECT * FROM system_users WHERE user_name = ?";
        connection.connect();
        connection.query(userQuery, [key], function (err, rows, fields) {
            if (err) throw err;
            console.log("Number of rows " + rows.length);
            if (rows.length >= 1) {
                console.log("Found user " + username);
                return done (null, rows[0].user_name);
            }
            else {
                console.log("User not found " + username);
                return done(null, false)
            }
        })
    }
));

passport.serializeUser(function (user, done) {
    console.log('serializeUser now');
    if(user) {
        done(null, user);
    }
});

passport.deserializeUser(function(user, done) {
    console.log("deserializeUser now");
    if(user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
});

require('./server/config/routes')(app);


var server = http.createServer(app);

server.listen(process.env.PORT || config.port, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Plutus listening at", addr.address + ":" + addr.port);
});