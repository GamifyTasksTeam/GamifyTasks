var mongoose = require('mongoose');
var User = require('../models/user.js').User;

exports.app = function(req, res) {

	User.findById(req.session.userId).exec().then(function(user) {
		res.render('app/app', {
			title : 'Tasks - Gamify Tasks',
			user : user
		});
	}, function(err) {
		res.send(500, {
			error : "An error occured "
		});
	});

};

exports.index = function(req, res) {

	User.findById(req.session.userId).exec().then(function(user) {
		res.render('home', {
			title : 'Home - Gamify Tasks',
			user : user
		});
	}, function(err) {
		res.send(500, {
			error : "An error occured "
		});
	});

};

exports.about = function(req, res) {

	User.findById(req.session.userId).exec().then(function(user) {
		res.render('about', {
			title : 'About - Gamify Tasks',
			user : user
		});
	}, function(err) {
		res.send(500, {
			error : "An error occured "
		});
	});

};

exports.contact = function(req, res) {

	User.findById(req.session.userId).exec().then(function(user) {
		res.render('contact', {
			title : 'Contact - Gamify Tasks',
			user : user
		});
	}, function(err) {
		res.send(500, {
			error : "An error occured "
		});
	});

};

exports.login = function(req, res) {

	User.findById(req.session.userId).exec().then(function(user) {
		res.render('login', {
			title : 'Login - Gamify Tasks',
			user : user
		});
	}, function(err) {
		res.send(500, {
			error : "An error occured "
		});
	});

};

exports.logout = function(req, res) {
	req.session.userId = null;
	res.redirect("/");
}
