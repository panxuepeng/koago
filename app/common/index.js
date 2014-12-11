// common 目录下，只需用引入此index即可
var mongoose = require('mongoose')
	, util = require("util")
	, events = require("events")
	, _ = require('underscore')
	
console.log('common')

var Event = function() {
	events.EventEmitter.call(this)
}
util.inherits(Event, events.EventEmitter)

exports.event = new Event
exports._ = _

exports.encrypt = require('./encrypt')
//	C.mail = require('./mail').init(config)
//	C.redis = require('./redis').init(config.redis)
//	C.logger = require('./log4js').init(config.log4js)

exports.model = function (name) {
	return mongoose.model(name)
}

exports.mongoose = mongoose
