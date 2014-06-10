/**
 * Created by tkulish on 6/2/2014.
 */
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mysql://wikid:wikid@localhost/;insecureAuth: true',
        dbHost: 'localhost',
        dbUser: 'wikid',
        dbPassword: 'wikid',
        dbDatabase: 'si2k4',
        rootPath: rootPath,
        port: process.env.PORT || 3000
    },
    production: {
        db: '',
        rootPath: rootPath,
        port: process.env.PORT || 8080
    }

};