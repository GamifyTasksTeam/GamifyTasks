var mongoose = require('mongoose');
var Reward = require('../../models/rewards.js').Reward;

// GET /api/reward/:id
// Get one specific reward
exports.getRewardByID = function(req, res) {
	Reward.findById(req.params.id, function(err, reward) {
		if (!err && reward) {
			res.send({ reward: reward});
		}
		else {
			console.log(err);
			res.send(400);
		}
	});
};

// GET /api/reward/
// Get all rewards
exports.getRewardsByUser = function(req, res) {
	Reward.find({ 'userID' : req.session.userId },
		function(err, rewards) {
			if (!err && rewards) {
				res.send({ rewards: rewards });
			}
			else {
				console.log(err);
				res.send(400);
			}
		});
};

// POST /api/reward/
// Add new reward
exports.addReward = function(req, res) {
	var reward;
	try
	{
		reward = new Reward({
			userID : req.session.userId,
			name : req.body.reward.name,
			green : req.body.reward.green,
			purple : req.body.reward.purple,
			red : req.body.reward.red,
			blue : req.body.reward.blue
		});
	}
	catch (err) {
		// Not enough information in request body
		res.send(400);
		return;
	}
	reward.save(function(err) {
		if (!err) {
			// Send back reward
			res.send(200, { reward: reward });
		}
		else {
			console.log(err);
			res.send(400);
		}
	});
};

// PUT /api/reward/:id
// Update reward (or insert if id is not yet in database)
exports.updateReward = function(req, res) {
	Reward.findByIdAndUpdate(req.params.id,
	{
		userID : req.session.userId,
		name : req.body.reward.name,
		green : req.body.reward.green,
		purple : req.body.reward.purple,
		red : req.body.reward.red,
		blue : req.body.reward.blue
	},
	{ upsert : true },
	function(err, reward) {
		// Send back object if successful
		if (!err && reward) {
			res.send(200, { reward: reward });
		}
		else {
			res.send(400);
		}
	});
};

// DELETE /api/reward/:id
// Find reward by id, make sure it exists, and delete it
exports.deleteReward = function(req, res) {
	Reward.findByIdAndRemove(req.params.id, function(err, reward) {
		if (!err && reward) {
			res.send(200, {});
		}
		else {
			console.log(err);
			res.send(400);
		}
	});
};