var mongoose = require('mongoose');
var Reward = require('../../models/rewards.js').Reward;
exports.getRewardByID = function(req, res) {
	Reward.findById(req.params.id, function(err, reward) {
		if (!err) {
			res.send(reward);
		}
		else {
			console.log(err);
			// TODO send 404, 500, etc.
		}
	});
};

exports.getRewardsByUser = function(req, res) {
	Reward.find({ 'userID' : req.session.userId },
		function(err, rewards) {
			if (!err) {
				res.send(rewards);
			}
			else {
				console.log(err);
				// TODO send 404, 500, etc.
			}
		});
};

exports.addReward = function(req, res) {
	task = new Task({
		userID : req.session.userId,
		name : req.body.name,
		categories : {
			green : req.body.categories.green,
			purple : req.body.categories.purple,
			red : req.body.categories.red,
			blue : req.body.categories.blue
		},
		schedule : req.body.schedule
	});
	task.save(function(err) {
		if (err) {
			console.log(err);
			// TODO send 404, 500, etc.
		}
		else {
			// Send back reward ID
			res.send({ id: task._id });
		}
	});
};

exports.updateReward = function(req, res) {
	res.send("TODO"); //TODO
};

exports.deleteReward = function(req, res) {
	res.send("TODO"); //TODO
};