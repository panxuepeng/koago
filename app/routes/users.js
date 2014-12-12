var Router = require('koa-router')
  , router = new Router()
  , users = require('../controllers/users')
  

router.get('/create', users.create)
router.get('/login', users.login)
router.get('/show/:uid', users.show)
router.get('/logout/:uid', users.logout)

module.exports = router