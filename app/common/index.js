// common Ŀ¼�£�ֻ���������index����
var mongoose = require('mongoose')
	, util = require("util")
	, events = require("events")
	, _ = require('underscore')
	, conf = global.app.conf

// ֧���Զ����¼�
// http://nodejs.org/api/util.html#util_util_inherits_constructor_superconstructor
var Event = function() {
	events.EventEmitter.call(this)
}
util.inherits(Event, events.EventEmitter)


//	C.mail = require('./mail').init(config)

var model = function (name) {
	return mongoose.model(name)
}

exports = {
	_: _
	, event: new Event
	, mongoose: mongoose
	, model: model
//	, log: require('./log4js').init(conf.log4js)
}
//_.extend(exports, require('./encrypt'))

module.exports = exports