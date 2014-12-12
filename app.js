
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

// 启动（在配置文件加载之前）
require("./bootstrap/index")(app)

// 加载配置文件
require("./config/index")(app)

// 初始化（在配置文件加载之后）
require("./init/index")(app)

// redis
app.use(redisPool(app.conf.redis))

//require("./app/common/index")

// 注意加载顺序
load(['middleware', 'app/models', 'app/controllers', 'app/events'])

// 最后加载路由
require("./app/routes")(app)

var port = app.conf.port || 80
app.listen(port)

console.log(dateFormat('yyyy-mm-dd HH:MM:ss') + ' started on port '+ port)

module.exports = app


// 批量加载某子目录下的js文件
function load(dirs) {
	for(var i=0; i < dirs.length; i++) {
		glob.sync(app.root + dirs[i] +'/**/*.js').forEach(function(file) {
			console.log(['load', file])
			require(file)
		})
	}
}
