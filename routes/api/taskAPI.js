var mongoose = require('mongoose');
var Task = require('../../models/tasks.js').Task;
exports.getTaskByID = function(req, res) {
	Task.findById(req.params.id, function(err, task) {
		if (!err) {
			res.send(task);
		}
		else {
			console.log(err);
		}
	});
}

exports.getTasksByUser = function(req, res) {
	Task.find({	'userID' : req.session.userId },
		function(err, tasks) {
			if (!err) {
				res.send(tasks);
			}
			else {
				console.log(err);
			}
		});
}

exports.saveTask = function(req, res) {
	task = new Task({
		userID : req.session.userId,
		name : req.body.name,
		green : req.body.green,
		purple : req.body.purple,
		red : req.body.red,
		blue : req.body.blue,
		schedule : req.body.schedule
	});
	task.save(function(err) {
		if (err) {
			console.log(err);
		}
	});
	res.send(task);
}