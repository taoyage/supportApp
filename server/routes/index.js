var crypto = require('crypto'),
User = require('../user/user');

module.exports = function(app) {
	//注册功能
	app.post('/reg',function(req,res){
		//接受post发来的数据并存入变量
		console.log(req.body);
		var username = req.body.username,
		name = req.body.name,
		password = req.body.password,
		password_re = req.body.password_repeat;

		if(password != password_re){
			req.body = {error:'The password did not match the re-typed password '};
			return res.json(req.body);
		}

		// yield db.users.insert({ name: 'Tobi', species: 'ferret' });

		//声称密码的md5值
		var md5 = crypto.createHash('md5'),
		password = md5.update(req.body.password).digest('hex');

		//调用user.js文件的User函数,将name,password数据传递
		var newUser = new User({
			username : username,
			name : name,
			password : password
		});



		//检查用户是否存在
		User.get(newUser.username,function(err,user){
			if(user){
				req.body = {error:'User already exists'};
				return res.json(req.body);
			}

			//不存在则新增用户
			newUser.save(function(err,user){
				if(err){
					req.body = {error:'Registration failed'};
					return res.json(req.body);
				}
				return res.json("SUCCESS");
			})
		})
	});

	//登录功能
	app.post("/login",function(req,res){
		//生成md5值
		var md5 = crypto.createHash('md5'),
		password = md5.update(req.body.password).digest('hex');
		//检查用户是否存在
		User.get(req.body.username,function(err,user){
			if(!user){
				req.body = {error:'User does not exist'};
				return res.json(req.body);
			}

			//检查密码是否一致
			if(user.password != password){
				req.body = {error:'Password mistake'};
				return res.json(req.body);
			}

			return res.json('logined');


			//用户名密码都匹配后,将用户信息存入session
		})
	});
};

