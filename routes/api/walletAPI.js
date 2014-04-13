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
	Wallet.find({ 'userID' : req.session.userId},
		function(err, wallet) {
			if (!err) {
				res.send({"wallet":wallet});
			}
			else {
				console.log(err);
			}
		});
}

exports.updateWallet = function(req, res) {
	console.log(req.body);
	Wallet.findOneAndUpdate({ 'userID' : req.session.userId },
			{
				green: req.body.wallet.green,
				purple: req.body.wallet.purple,
				red: req.body.wallet.red,
				blue: req.body.wallet.blue
			},
			function(err, wallet) {
				if (!err) {
					res.send({"wallet" : wallet});
				}
				else {
					console.log(err);
					res.send(500);
				}
			});
}