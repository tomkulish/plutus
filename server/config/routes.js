/**
 * Created by tkulish on 6/9/2014.
 */
var passport = require('passport');

module.exports = function (app) {

    //app.set('views', __dirname + '/server/views');
    //app.set('view engine', 'jade');

    app.post('/login', function (req, res, next) {
        var auth = passport.authenticate('local', function(err, user) {
            if(err) { return next(err); }
            if(!user) { res.send({success:false}); }
            req.logIn(user, function (err) {
                if(err) { return next(err); }
                res.send({success: true, user: user});
            })
        });
        auth(req, res, next);
    });

    app.get('*', function(req, res) {
        res.render('index');
    });

};