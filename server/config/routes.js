/**
 * Created by tkulish on 6/9/2014.
 */
var auth = require('./auth');

module.exports = function (app) {

    //app.set('views', __dirname + '/server/views');
    //app.set('view engine', 'jade');

    app.post('/login', auth.authenticate);

    app.get('*', function(req, res) {
        res.render('index');
    });

};