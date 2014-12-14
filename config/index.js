

module.exports = function(app) {
	var conf = require("./app")
	conf.log4js = require("./log4js")
	conf.koaRedisPool = require("./koa-redis-pool")
	conf.mongoose = require("./mongoose")
	conf.koaPooledMongo = require("./koa-pooled-mongo")
	conf.mail = require("./mail")
	
	app.conf = conf
}