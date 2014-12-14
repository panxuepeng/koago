

var redisPool = require('koa-redis-pool')
module.exports = function(conf) {
	app.use(redisPool(conf))
}