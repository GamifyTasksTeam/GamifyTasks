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
		schedule : {
			green : req.body.schedule.green,
			purple : req.body.schedule.purple,
			red : req.body.schedule.red,
			blue : req.body.schedule.blue
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