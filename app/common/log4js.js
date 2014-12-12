
var log4js = require('log4js')
var util = require('util')
var dateFormat = require('dateformat')
var accessLogger
	, exceptionLogger
	, bizLogger
	, debugLogger
	, infoLogger
	, errorLogger
	, perfLogger
	
var perfKeys = {}

// 配置，仅需执行一次
exports.init = function(config) {
	delete exports.init
	
	log4js.configure(config)
	
	accessLogger = log4js.getLogger('access')
	exceptionLogger = log4js.getLogger('exception')
	infoLogger = log4js.getLogger('info')
	errorLogger = log4js.getLogger('error')
	bizLogger = log4js.getLogger('biz')
	debugLogger = log4js.getLogger('debug')
	perfLogger = log4js.getLogger('perf')
	
	// 访问记录日志
	
		// 参考
		// 日志级别对应规则：
		// http responses 3xx, level = WARN
		// http responses 4xx & 5xx, level = ERROR
		// else, level = INFO
	
	app.use(function *(next) {
        var req = this.request
			, header = req.header
			, nodeReq = this.req
			
        var str = util.format(
			"%s %s -- %s %s HTTP/%s, %s %s"
			, dateFormat('yyyy-mm-dd HH:MM:ss')
			, req.ip
			, req.method
			, req.url
			, nodeReq.httpVersion
			, req.length || null
			, header['user-agent']
		)

        accessLogger.debug(str)
        yield next
	})
	
	return exports
}

// 运行时异常日志
exports.exception = function(err) {
	exceptionLogger.error(err)
}

// 错误日志
exports.error = function(err, caller) {
	if ( !err ) {
		return
		
	} else if ( typeof err === 'object' && err.errors ) {
	
		// model验证错误信息
		err = err.errors
	} else if ( typeof err === 'object' && err.message ) {
	
		// 不需要保持调用堆栈等信息
		err = err.message
	}
	
	if ( caller ) {
		err = [caller, err]
	}
	
	errorLogger.error(err)
}

// 普通消息日志
exports.info = function(err, caller) {
	if ( caller ) {
		err = [caller, err]
	}
	infoLogger.info(err)
}

// 业务日志
exports.biz = function(err, caller) {
	if ( caller ) {
		err = [caller, err]
	}
	bizLogger.info(err)
}

// 调试日志
exports.debug = function(err, caller) {
	if ( caller ) {
		err = [caller, err]
	}
	debugLogger.debug(err)
}

// start 和 end 用来记录性能日志
exports.start = function() {
	var key = '' + Math.ceil(Math.random()*10000) 
	key += +(new Date)
	perfKeys[key] = +new Date
	return key
}

exports.end = function(key, maxDuration, msg) {
	// ['info','warn','error']
	var level = 'info'
	var duration = (new Date - perfKeys[key])/1000
	
	maxDuration = parseInt(maxDuration, 10) || 3
	
	if ( duration > maxDuration ) {
		level = 'error'
	}else if ( duration > 1 ) {
		level = 'warn'
	}
	
	perfLogger[level](duration + 's ' + msg)
	
	perfKeys[key] = null
}

process.on('exit', function() {
	exceptionLogger.fatal('服务异常关闭')
})

