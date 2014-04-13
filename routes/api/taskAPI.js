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
				res.send({"tasks":tasks});
			}
			else {
				console.log(err);
			}
		});
}

exports.getCurrentTasks = function(req,res){
	Task.find({	'userID' : req.session.userId },
		function(err, tasks) {
			if (!err) {
				var currentTasks = []
				tasks.forEach(function(task){
					var splitSchedule = task.schedule.split(" ");
					switch(splitSchedule[0]){
						case "always":
							currentTasks.push(task);
							break;
						case "once":
							currentTasks.push(task);
							break;
						case "weekly":
							var d = new Date();
							var n = d.getDay();
							if(n == splitSchedule[1]){
								currentTasks.push(task);
							}
							break;
						case "scheduled":
							var d = new Date();
							if(d.getYear() == splitSchedule[1] && d.getMonth() == splitSchedule[2] && d.getDate() == splitSchedule[3]){
								currentTasks.push(task);
							}
							break;
					}
					
				});
				res.send(currentTasks);
			}
			else {
				console.log(err);
			}
		});
}

exports.addTask = function(req, res) {
	task = new Task({
		userID : req.session.userId,
		name : req.body.task.name,
		green : req.body.task.green,
		purple : req.body.task.purple,
		red : req.body.task.red,
		blue : req.body.task.blue,
		schedule : req.body.task.schedule
	});
	task.save(function(err) {
		if (err) {
			console.log(err);
		}
	});
	res.send({'task':task});
}

exports.updateTask = function(req, res){
	Task.findById(req.params.id, function(err, task){
		if(!err){
			if(task.userID != req.session.userId){
				res.send(403)
			}else{
				task.name = req.body.name;
				task.green = req.body.green;
				task.purple = req.body.purple;
				task.red = req.body.red;
				task.blue = req.body.blue;
				task.schedule = req.body.schedule;
				task.save(function(err){
					console.log(err);
				});
			}
		} else {
			console.log(err);
		}
	});
}

exports.completeTask = function(req, res){
	Task.findById(req.params.id, function(err, task) {
		if (!err) {
			if(task.userID != req.session.userId){
				res.send(403)
			}else{
				if(task.schedule != "always"){
					task.remove(function(err,task){
						if(!err)
						{
							res.send('OK');
						}else{
							console.log(err);
						}
					});
				}
			}
		}
		else {
			console.log(err);
		}
	});
}

exports.deleteTask = function(req,res){
	Task.findById(req.params.id, function(err, task) {
		if (!err) {
			if(task.userID != req.session.userId){
				res.send(403)
			}else{
				task.remove(function(err,task){
					if(!err)
					{
						res.send({});
					}else{
						console.log(err);
					}
				});
			}
		}
		else {
			console.log(err);
		}
	});
}