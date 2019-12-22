const router = require('koa-router')()
const userHandler = require('./../handlers/test.js')


module.exports = (app, group) => {
  // 前缀
  router.prefix(group)
  
  router.get('/addUser', userHandler.create)
  router.delete('/deleteItem/:id', userHandler.deleteItem)
  router.get('/allUserInfo', userHandler.getInfo)
  app.use(router.routes()).use(router.allowedMethods())
}

