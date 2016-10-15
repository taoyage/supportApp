var mongodb =require('../db/db');

//接受index.js newuser传来的user数据病保存到变量
function User(user){
	this.name = user.name;
	this.password = user.password;
	this.username = user.username;
}

module.exports = User;

//存储用户信息
User.prototype.save = function(callback){
	var user = {
		name: this.name,
		password : this.password,
		user : this.username
	};

//打开数据库存
	mongodb.open(function(err,db){
		if(err){
			return callback(err);//错误，返回err信息
		}
		//读取user集合
		db.collection('users',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);////错误，返回err信息
			}
			//将用户数据插入users集合
			collection.insert(user,{
				safe:true
			},function(err,user){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null,user[0]);//成功，err为null,并返回存储后的数据文档
			});
		});
	});
};

//读取用户信息
User.get = function(username,callback){
	//打开数据库
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}
		//读取users集合
		db.collection('users',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}
			//查找用户名（name键）值为name一个文档
			collection.findOne({
				user : username
			},function(err,user){
				mongodb.close();
				if(err){
					return callback(err);
				}
				callback(null,user);
			});
		});
	});
};







