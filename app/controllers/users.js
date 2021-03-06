
var mongoose = require('mongoose')
var User = mongoose.model('User')

module.exports = {
	create: function* (next) {
		var ctx = this
		var data = {
			username: 'panxuepeng@sijiaomao.com'
		 	, password: ctx.util.md5('123456')
		}

		var user = new User(data)
		/*
		yield function() {
			console.log('save')
			user.save()
		}
		//yield user.add()
		this.body = user
		*/
		//console.dir(user)
		var collection = yield this.mongo.collection('users');
		var results = yield collection.save({ _id: 1, name: 'koa-pooled-mongo' });
		console.log(results);
		var one = yield collection.find({});
		console.log(one);
	},
	login: function *(next) {
		var ctx = this
		var uid = req.params.uid
		
		User.findOne({ username: post.username}).exec(function(err, user) {
			if (err) {
				res.jsonp([500, err])
			} else if ( !user ) {
				res.jsonp([404, '用户不存在或密码错误'])
			} else if ( user.password !== utils.hashPassword(post.password) ) {
				res.jsonp([405, '用户不存在或密码错误.'])
			} else {
				auth.login(req, res, user)
				res.jsonp([200, '登录成功'])
			}
		})
	},
	show: function *(next) {
		var ctx = this
		var uid = req.params.uid
		
		User.findOne({ _id: uid}).exec(function (err, user) {
			if (err) {
				ctx.body = [500, err]
			} else if (user) {
				ctx.body = user
			} else {
				ctx.body = [404, 'NOT FOUND']
			}
		})
	},
	logout: function *(next) {
		
	}
	
}