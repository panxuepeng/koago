
var session = require('koa-generic-session')
var redisStore = require('koa-redis')

app.use(session({
	store: redisStore()
}))

