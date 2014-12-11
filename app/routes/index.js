var Router = require('koa-router')
  , router = new Router()
  , index = require('../controllers/index')
  

router.get('/', index.wellcome)

module.exports = router