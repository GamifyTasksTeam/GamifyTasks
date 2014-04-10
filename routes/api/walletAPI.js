var mongoose = require('mongoose');
var Wallet = require('../../models/wallet.js').Wallet;
exports.getWalletByID = function(req, res) {
	return Wallet.findById(req.params.id, function(err, wallet) {
		if (!err) {
			res.send(wallet);
		}
		else {
			console.log(err);
		}
	});
}

exports.getWalletByUser = function(req, res) {
	Wallet.findOne({ 'userID' : req.session.userId},
		function(err, wallet) {
			if (!err) {
				res.send(wallet);
			}
			else {
				console.log(err);
			}
		});
}

exports.updateWalletByUser = function(req, res) {
	Wallet.findOne({ 'userID' : req.session.userId },
		function(err, wallet) {
			wallet.green = req.body.green;
			wallet.purple = req.body.purple;
			wallet.red = req.body.red;
			wallet.blue = req.body.blue;
			wallet.save(function(err) {
				if (err) {
					console.log(err);
				}
				res.send(wallet);
			});
		});
}