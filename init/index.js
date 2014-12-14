
module.exports = function(app) {

//	require('./mongoose')(app.conf.mongoose)
	require('./koa-redis-pool')(app.conf.koaRedisPool)
	require('./koa-pooled-mongo')(app.conf.koaPooledMongo)
	require('./mkdir')(app)
	
}
