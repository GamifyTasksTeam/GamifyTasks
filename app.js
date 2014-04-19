var express = require('express');
var routes = require('./routes/staticRoutes.js');

var http = require('http');
var https = require('https');
var forceSSL = require('express-force-ssl');
var fs = require('fs');

var path = require('path');
var mongoose = require('mongoose');
var clientSession = require("client-sessions");

var User = require('./models/user.js').User;
var Wallet = require('./models/wallet.js').Wallet;
// grab the models
var walletModel = require('./models/wallet.js');
var rewardsModel = require('./models/rewards.js');
var tasksModel = require('./models/tasks.js');
//OATH
var passport = require('passport')
var GoogleStrategy = require('passport-google').Strategy;

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('httpsPort', process.env.SSL_PORT || 8443)
app.set('host', process.env.HOST || 'localhost');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(clientSession({
    cookieName: 'session', // cookie name dictates the key name added to the request object
    secret: process.env.COOKIE_SECRET || 'This is a development secret only.  MAKE SURE to set the environment var.', // should be a large unguessable string
    duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
    activeDuration: 1000 * 60 * 5 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
}));

app.use(forceSSL);
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
	console.log("database error");
});
db.once('open', function callback () { 
   console.log("connected to db");
   dbConnected = true;
});

//static routes
app.get('/', routes.index);
app.get('/about', routes.about);
app.get('/contact', routes.contact);
app.get('/login', routes.login);
app.get('/logout', routes.logout);
app.get('/tasks', authenticateUserWeb, routes.app);

var options = {};

if ('development' == app.get('env')) {
	options.key = fs.readFileSync('devKeys/key.pem');
	options.cert = fs.readFileSync('devKeys/cert.pem');
}
else {
	options.key = fs.readFileSync('productionKeys/private.key');
	options.cert = fs.readFileSync('productionKeys/gamifytasks_com.crt');
	options.ca = [
		fs.readFileSync('productionKeys/COMODORSADomainValidationSecureServerCA.crt'),
		fs.readFileSync('productionKeys/COMODORSAAddTrustCA.crt'),
		fs.readFileSync('productionKeys/AddTrustExternalCARoot.crt')
	];
}

https.createServer(options, app).listen(app.get('httpsPort'), function() {
	console.log('Express secure server listening on port ' + app.get('httpsPort'));
});

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
	    console.log("database error");
		done(new Error("An error occurred.  Please try again."));
		return;
	}
	
	User.update({ identifier : identifier	}, { identifier : identifier, profile : profile }, { upsert : true }).exec()
	
	.then(function() {
		return User.findOne({ 'identifier' : identifier }).exec();
	})
	
	.then(function(user) {
		Wallet.update({ userID : user._id},	{
			userID : user._id,
			green : 0,
			purple : 0,
			red : 0,
			blue : 0 }, { upsert : true }).exec()
		.then(function() {
			// Successful login/signup and wallet creation
			done(null, user);
		},
		function(err) {
			done(err);
		});
	}, function(err) {
		done(err);
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
    passport.authenticate('google', { failureRedirect: '/login',
									  session: false }),
	function (req, res) {
	    req.session.userId = req.user._id;
		res.redirect('/tasks');
	});

function authenticateUser(req, res, next) {
	User.findById(req.session.userId).exec()
	.then(function (user) {
		if (user) {
			next();
		}
		else {
			res.send(401, { error: "You must log in" });
		}
	},
	function(err) {
		res.send(500, { error: "An error occured during authentication" });
	});
}

function authenticateUserWeb(req, res, next) {
	User.findById(req.session.userId).exec()
	.then(function (user) {
		if (user) {
			next();
		}
		else {
			res.redirect("/login");
		}
	},
	function(err) {
		res.send(500, { error: "An error occured during authentication" });
	});
}

//End of OAuth

//Begin API
//app.get('/api/user/:id', authenticateUser, require('./routes/api/userAPI.js').getUser);

//Wallet
app.get('/api/wallets', authenticateUser, require('./routes/api/walletAPI.js').getWalletByUser);
app.put('/api/wallets/:id', authenticateUser, require('./routes/api/walletAPI.js').updateWallet);

//Tasks
app.get('/api/task/:id', authenticateUser, require('./routes/api/taskAPI.js').getTaskByID);
app.get('/api/tasks', authenticateUser, require('./routes/api/taskAPI.js').getTasksByUser);
app.get('/api/tasks/current', authenticateUser, require('./routes/api/taskAPI.js').getCurrentTasks);
app.post('/api/tasks', authenticateUser, require('./routes/api/taskAPI.js').addTask);
app.put('/api/tasks/:id', authenticateUser, require('./routes/api/taskAPI.js').updateTask);
app.put('/api/task/complete/:id', authenticateUser, require('./routes/api/taskAPI.js').completeTask);
app.delete('/api/tasks/:id', authenticateUser, require('./routes/api/taskAPI.js').deleteTask);

// Rewards
app.get('/api/rewards/:id', authenticateUser, require('./routes/api/rewardAPI.js').getRewardByID);
app.get('/api/rewards', authenticateUser, require('./routes/api/rewardAPI.js').getRewardsByUser);
app.post('/api/rewards', authenticateUser, require('./routes/api/rewardAPI.js').addReward);
app.put('/api/rewards/:id', authenticateUser, require('./routes/api/rewardAPI.js').updateReward);
app.delete('/api/rewards/:id', authenticateUser, require('./routes/api/rewardAPI.js').deleteReward);