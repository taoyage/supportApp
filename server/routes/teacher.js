var path = require('path');
var db = require('../db/nedb');

module.exports = function(app){

	app.get('/admin',function(req,res){
		res.sendFile(path.join(__dirname, '../public', 'index.html'));
	});

	app.post('/users',function(req,res){
		var day = parseInt(req.body.date);
		var lesson = req.body.lesson;
		db.log.find({lesson:lesson , day:day}, function (err, docs) {
			return res.json(docs);
		});
	});
}