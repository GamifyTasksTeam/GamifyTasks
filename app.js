var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

//OATH
var passport = require('passport')
var GoogleStrategy = require('passport-google').Strategy;

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(passport.initialize());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

mongoose.connect('mongodb://localhost/GamifyTasks');

app.get('/', routes.index);
app.get('/mockup/app',routes.mockupApp);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// beginning of OAuth


passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:8080/auth/google/return',
    realm: 'http://localhost:8080'
  },
  function(identifier, profile, done) {
    console.log("indentifier: " + identifier);
	console.log(profile);
	//console.log(done);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function callback () { 
           console.log("connected to db"):
        });
	done(null,{ openID: identifier} );
	//User.findOrCreate({ openId: identifier }, function(err, user) {
    //  done(err, user);
    //});
  }
));

// Redirect the user to Google for authentication.  When complete, Google
// will redirect the user back to the application at
//     /auth/google/return
app.get('/auth/google', passport.authenticate('google'));

// Google will redirect the user to this URL after authentication.  Finish
// the process by verifying the assertion.  If valid, the user will be
// logged in.  Otherwise, authentication has failed.
app.get('/auth/google/return', 
  passport.authenticate('google', { successRedirect: '/',
                                    failureRedirect: '/login',
									session: false}));
//End of OAuth
