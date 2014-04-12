var mongoose = require('mongoose');
var rewardSchema = new mongoose.Schema({
	userID: String,
	name: String,
	categories: {
		green: Number,
		purple: Number,
		red: Number,
		blue: Number,
	}
});

exports.Reward = mongoose.model('Reward', rewardSchema);