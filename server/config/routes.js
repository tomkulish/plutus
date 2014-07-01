/**
 * Created by tkulish on 6/9/2014.
 */
var passport = require('passport');

module.exports = function (app) {

    //app.set('views', __dirname + '/server/views');
    //app.set('view engine', 'jade');

    app.post('/login', function (req, res, next) {
        console.log ("Calling login");
        var auth = passport.authenticate('local', function(err, user) {
            console.log("Calling Passport Authentication");
            if(err) { console.log("ERROR returning error"); return next(err); }
            if(!user) { console.log("Unable to find user"); res.send({success:false}); }
            req.logIn(user, function (err) {
                console.log("In the login function");
                console.log("User: " + user);
                if(err) { console.log("ERROR in the loggin function"); return next(err); }
                console.log("About to send the success to something");
                res.send({success: true, user: user});
                console.log("Sent the success to something");
            })
        });
        console.log("After the authenticate phase");
        auth(req, res, next);
        console.log("Finished auth() call");
    });

    app.get('*', function(req, res) {
        res.render('index');
    });

};