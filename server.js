var http = require('http');
var path = require('path');
var async = require('async');
var socketio = require('socket.io');
var express = require('express');
var stylus = require('stylus');

var env = process.env.NODE_ENV = process.env.NODE_ENV  || 'development';
var app     = express();
var config  = require('./server/config/config')[env];

require('./server/config/express')(app, config);

var server = http.createServer(app);

//app.set('views', __dirname + '/server/views');
//app.set('view engine', 'jade');

app.get('*', function(req, res) {
    res.render('index');
});

//app.listen(port);
//console.log('Now serving the app at http://localhost:' + port + '/');

server.listen(process.env.PORT || config.port, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Plutus listening at", addr.address + ":" + addr.port);
});