var mongoose = require('mongoose');
var task = new mongoose.Schema({
	userID: String,
	name: String,
	green: Number,
	purple: Number,
	red: Number,
	blue: Number,
	schedule: String
});

exports.Task = mongoose.model('Task',task);