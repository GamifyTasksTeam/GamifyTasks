var mongoose = require('mongoose');
var tasks = new mongoose.Schema({
	userID: String,
	tasks: [{name: String,
		green: Number,
		purple: Number,
		red: Number,
		blue: Number,
		schedule: String
	}]
});

exports.tasks = tasks;