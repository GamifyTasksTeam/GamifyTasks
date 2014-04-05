var mongoose = require('mongoose');
var rewards = new mongoose.Schema({
	userID: String,
	rewards: [{name: String,
		green: Number,
		purple: Number,
		red: Number,
		blue: Number,
		schedule: String
	}]
});

exports.rewards = rewards;