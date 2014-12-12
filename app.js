
var glob = require("glob")
var dateFormat = require('dateformat')
var koa = require('koa')
var redisPool = require('koa-redis-pool')
var session = require('koa-generic-session')
var redisStore = require('koa-redis')

var app = koa()
global.app = app

app.name = 'koago'
app.keys = ['keys', 'keykeys']

app.use(session({
  store: redisStore()
}))

// �������������ļ�����֮ǰ��
require("./bootstrap/index")(app)

// ���������ļ�
require("./config/index")(app)

// ��ʼ�����������ļ�����֮��
require("./init/index")(app)

// redis
app.use(redisPool(app.conf.redis))

//require("./app/common/index")

// ע�����˳��
load(['middleware', 'app/models', 'app/controllers', 'app/events'])

// ������·��
require("./app/routes")(app)

var port = app.conf.port || 80
app.listen(port)

console.log(dateFormat('yyyy-mm-dd HH:MM:ss') + ' started on port '+ port)

module.exports = app


// ��������ĳ��Ŀ¼�µ�js�ļ�
function load(dirs) {
	for(var i=0; i < dirs.length; i++) {
		glob.sync(app.root + dirs[i] +'/**/*.js').forEach(function(file) {
			console.log(['load', file])
			require(file)
		})
	}
}
