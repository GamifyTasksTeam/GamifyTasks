var mongoose = require('mongoose');
var User = require('../../models/user.js').User;
exports.getUser = function(req,res){
	return User.findById(req.params.id, function(err,user){
		if(!err){
			return res.send(user);
		}else{
			return console.log(err);
		}
	});
}