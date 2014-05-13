var http = require('http');
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require("express"),
  app     = express(),
  port    = parseInt(process.env.PORT, 10) || 8080;
  
var env = process.env.NODE_ENV = process.env.NODE_ENV  || 'development';

app.configure(function() {
    app.set('views', __dirname + '/server/views');
    app.set('view_engine', 'jade');
    })
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var server = http.createServer(app);

app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/client'));
app.use(morgan('dev'));

app.get('*', function(req, res) {
    res.render('index');
})

//app.listen(port);
//console.log('Now serving the app at http://localhost:' + port + '/');

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Plutus listening at", addr.address + ":" + addr.port);
});