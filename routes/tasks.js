
var express = require('express');
var path = require('path');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('mongodb://phoenixqm:196010qm@ds145365.mlab.com:45365/mlabtest');

router.get('/tasks', function (req,res,next){
	var obj = db.tasks.find(function(err, tasks){
		if (err){
			res.send(err);
		} else {
			res.json(tasks);
		}
	});

});

router.get('/task/:id', function (req,res,next){
	var obj = db.tasks.findOne({_id:mongojs.ObjectId(req.params.id)}, function(err, task){
		if (err){
			res.send(err);
		} else {
			res.json(task);
		}
	});

});
router.post('/task/:id', function (req,res,next){
	var task = req.body;
	if (!task.title || (task.isDone + '')){
		res.status(400);
		res.json({error:'Bad data'});
	} else {
		db.tasks.save(task, function(err, task){
			if (err){
				res.send(err);
			} else {
				res.json(task);
			}
		});
	}
});
router.delete('/task/:id', function (req,res,next){

	db.tasks.remove({_id:mongojs.ObjectId(req.params.id)}, function(err, task){
		if (err){
			res.send(err);
		} else {
			res.json(task);
		}
	});
	
});
router.put('/task/:id', function (req,res,next){
	var task = req.body;
	var updatedTask =  {};
	if (task.isDone) {
		updatedTask.isDone = task.isDone;
	}
	if (task.title) {
		updatedTask.title = task.title;
	}
	if (!updatedTask) {
		res.status(400);
		res.json({error:'Bad data'});
	} else {
		db.tasks.update({_id:mongojs.ObjectId(req.params.id)}, updatedTask, function(err, task){
			if (err){
				res.send(err);
			} else {
				res.json(task);
			}
		});
	}
});
module.exports = router;