
var express = require('express');
var path = require('path');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('mongodb://phoenixqm:196010qm@ds145365.mlab.com:45365/mlabtest');

router.get('/books', function (req,res,next){
	var obj = db.books.find(function(err, books){
		if (err){
			res.send(err);
		} else {
			res.json(books);
		}
	});

});

router.get('/book/:id', function (req,res,next){
	var obj = db.books.findOne({_id:mongojs.ObjectId(req.params.id)}, function(err, book){
		if (err){
			res.send(err);
		} else {
			res.json(book);
		}
	});

});
router.post('/book/:id', function (req,res,next){
	var task = req.body;
	if (!task.title || (book.isDone + '')){
		res.status(400);
		res.json({error:'Bad data'});
	} else {
		db.books.save(book, function(err, book){
			if (err){
				res.send(err);
			} else {
				res.json(book);
			}
		});
	}


});
module.exports = router;