var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	identifier: String,
	profile: Object
});

var User = mongoose.model('User', userSchema);
exports.User = User;