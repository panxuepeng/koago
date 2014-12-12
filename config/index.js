

module.exports = function(app) {
	var conf = require("./app")
	conf.log4js = require("./log4js")
	conf.redis = require("./redis")
	conf.mongoose = require("./mongoose")
	conf.mail = require("./mail")
	
	app.conf = conf
}