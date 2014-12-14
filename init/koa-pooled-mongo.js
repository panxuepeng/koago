var mongo = require('koa-pooled-mongo')

module.exports = function(conf) {
	console.log(['mongo', conf])
	app.use(mongo(conf))
}