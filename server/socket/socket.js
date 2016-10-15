var db = require('../db/nedb');
var users = [];
var logs = [];
var connections = [];

module.exports = function(server){
	var io = require('socket.io').listen(server);

	io.sockets.on('connection',function(socket){

		socket.on('logined',function(user,lesson,date){
			connections.push(socket);
			console.log('connected: %s sockets connected',connections.length);

			socket.on('disconnect',function(data){
				users.splice(users.indexOf(socket.username),1);
				logs.splice(users.indexOf(socket.username),1);
				updateUsername();
				connections.splice(connections.indexOf(socket),1);
				console.log('disconnected : %s sockets connected',connections.length);
				var logout_time = new Date().toLocaleTimeString();
				logs.push({
					user : user,
					year : date.year,
					month : date.month,
					login_time : date.time,
					day : date.day,
					lesson : lesson,
					logout_time : logout_time
				});
				console.log(logs);
				db.log.insert(logs);
			});
		});

		socket.on('logout',function(data){

			users.splice(users.indexOf(socket.username),1);
			updateUsername();
		})

		socket.on('new user',function(user,lesson,date,callback){
			users.push({
				user : user,
				year : date.year,
				month : date.month,
				time : date.time,
				day : date.day,
				lesson : lesson
			});
			updateUsername();
		});

		socket.on('initialize',function(){
			updateUsername();
		})

		function updateUsername(){
			io.sockets.emit('get users',users);
		}
	});
};