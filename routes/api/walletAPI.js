var mongoose = require('mongoose');
var Wallet = require('../../models/wallet.js').Wallet;
exports.getWalletByID = function(req,res){
	return Wallet.findById(req.params.id, function(err,wallet){
		if(!err){
			return res.send(wallet);
		}else{
			return console.log(err);
		}
	});
}

exports.getWalletByUser = function(req,res){
	return Wallet.findOne({'userID':req.cookies.userId},function(err,wallet){
		if(!err){
			return res.send(wallet);
		} else {
			return console.log(err);
		}
	});
}

exports.updateWalletByUser = function(req,res){	
	return Wallet.findOne({'userID':req.cookies.userId},function(err,wallet){
		wallet.green = req.body.green;
		wallet.purple = req.body.purple;
		wallet.red = req.body.red;
		wallet.blue = req.body.blue;
		return wallet.save(function(err){
			if(err){
				console.lof(err);
			}
			return res.send(wallet);
		});
	});
}