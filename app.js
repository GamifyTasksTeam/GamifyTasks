var express = require('express');
var routes = require('./routes/staticRoutes.js');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

//OATH
var passport = require('passport')
var GoogleStrategy = require('passport-google').Strategy;

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('host', process.env.HOST || 'localhost');
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

var db = mongoose.connection;
var dbConnected = false; //may be unneccessary to use this
db.on('error', function() {
	console.log("error");
});
db.once('open', function callback () { 
   console.log("connected to db");
   dbConnected = true;
});

var userSchema = mongoose.Schema({
	identifier: String,
	profile: Object
});

var User = mongoose.model('User', userSchema);

//static routes
app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/contact', routes.contact);
app.get('/login', routes.login);

app.get('/tasks', routes.tasks);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// beginning of OAuth


passport.use(new GoogleStrategy({
    returnURL: 'http://' + app.get('host') + ':' + app.get('port') + '/auth/google/return',
    realm: 'http://' + app.get('host') + ':' + app.get('port')
  },
  function(identifier, profile, done) {

	if (!dbConnected) {
		//todo handle error (may be unneccessary)
	    console.log("database error");
		done();
		return;
	}
	
	var user = new User({
		identifier: identifier,
		profile: profile
	});
	
	//update/insert into Mongo ("upsert")
	User.update({identifier: user.identifier},
	            {identifier: user.identifier, profile: user.profile},
				{upsert: true},
				function (err, numberAffected, rawResponse) {
					done (err, user);
				});
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
