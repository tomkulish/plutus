/**
 * Created by tkulish on 6/2/2014.
 */
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: '',
        rootPath: rootPath,
        port: process.env.PORT || 3000
    },
    production: {
        db: '',
        rootPath: rootPath,
        port: process.env.PORT || 8080
    }

};