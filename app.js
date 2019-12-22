const koa = require("koa")
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const middleConfig = require('./src/middlewares/config')
const userRouter = require('./src/routers/test')
const app = new koa()

app.use(middleConfig())

app.use(bodyParser())

userRouter(app, '/user')

const asyncFunc = async (ctx, next) => {
  ctx.body = `<h1>Hello, 哈哈!</h1>`
}
router.get('/path', asyncFunc)

app.use(router.routes()).use(router.allowedMethods())

app.listen(8080)



