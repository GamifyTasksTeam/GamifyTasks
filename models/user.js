var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	identifier: String,
	profile: Object
});

exports.User = mongoose.model('User', userSchema);