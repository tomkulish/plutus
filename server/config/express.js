/**
 * Created by tkulish on 6/2/2014.
 */

var express = require("express");
var stylus = require('stylus');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var cookieparser = require('cookie-parser');
var expresssession = require('express-session');
var passport = require('passport');

module.exports = function(app, config) {
    // Stylus
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

    app.use(methodOverride());
    app.use(cookieparser());
    app.use(bodyParser());
    app.use(expresssession({secret: 'tom test unicorns'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(config.rootPath + '/client')); // The reason this is pulling the index.html is because its looking for that file. If you remove that from the client file it will pull the one from server/views
    app.use(morgan('dev'));
    app.set('view engine', 'jade');
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/client',
            compile: compile
        }
    ));
};
