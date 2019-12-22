### 搭建node + koa + mysql + sequelize 项目笔记

----

#### 第一步

看 [koa官网](https://github.com/demopark/koa-docs-Zh-CN)
看 [廖雪峰koa教程](https://www.liaoxuefeng.com/wiki/1022910821149312/1099849448318080)

执行以下步骤：
1、npm init

2、npm install koa

3、npm install koa-bodyparser  // 获取body 参数，这个koa-bodyparser必须在router之前被注册到app对象上

4、npm install koa-router   // 集中处理url

5、npm install nodemon
// 修改保存后自动更新。 package.json  文件里的scripts的start 改为`"start": "nodemon app.js",`

app.js 文件变成如下
```
const koa = require("koa")
const router = require('koa-router')()

const bodyParser = require('koa-bodyparser')
const app = new koa()


app.use(bodyParser())

const asyncFunc = async (ctx, next) => {
  ctx.body = `<h1>Hello, 哈哈!</h1>`
}
router.get('/path', asyncFunc)

app.use(router.routes()).use(router.allowedMethods())

app.listen(8080)
```

### 第二步

看 [sequelize 中文文档](https://github.com/demopark/sequelize-docs-Zh-CN/tree/master) 中的 Getting started 入门

执行以下步骤

1、npm install sequelize --save

2、npm install mysql2 --save

3、新建 src 文件夹，在src 下新建文件夹 routers，middlewares，handlers，controllers，models

在 middlewares 下新建config.js

config.js 文件如下：

```
// 在这个文件里，可以获取远程后端配置文件，例如 apollo，然后解析，获取对应的数据库信息。上线的时候运维只需要将配置文件替换成线上即可。

const Sequelize = require('sequelize')

module.exports = () => {
  return async (ctx, next) => { 
    const options = {
        host: 'localhost',
        user: 'root',
        password: '12345678',
        port: '3306',
        database: 'RUNOOB'
    }

    const seq = new Sequelize('RUNOOB', options.user, options.password, {
      host: options.host,
      port: options.port,
      dialect: 'mysql',
      pool: {
        max: 10,
      }
    })
    ctx.sequelize = seq  // 挂载上下文，在表建模 时用到
    await next()
  }
}
```
在 app.js 添加
```
const middleConfig = require('./src/middleware/config.js')

app.use(middleConfig())
```

### 第三步
操作数据库，写接口测试

1、在models 下新建test.js
[表建模](https://github.com/demopark/sequelize-docs-Zh-CN/blob/master/getting-started.md)

test.js 内容如下
```
const { Sequelize } = require('sequelize')
const moment = require('moment')

const user = function (seq) {
    const UserModal = seq.define('user', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
      },
      name: Sequelize.STRING,
      age: Sequelize.BIGINT,
      sex: Sequelize.ENUM('male', 'female'),
    }, {
      timestamps: false,
      freezeTableName: true,
    })
    return UserModal
}

module.exports = user
```

2、在controllers 下 新建test.js

内容如下

```
const { Sequelize } = require('sequelize');
const test = require('../models/test');

// 增加

const create = function (seq) {
  const UserModel = test(seq)
   // UserModel.sync(); 第一次使用， 并将下面的创建注释掉，第二次，打开创建， 这行是新建表
  UserModel.create({
    name: '',
    age: 1,
    sex: 'male',
  }).then(res => {
    console.log('创建', JSON.parse(JSON.stringify(res)));
  })
}

// 删除

const deleteItem = function (seq, ctx) {
    const id = ctx.params.id
    const UserModel = test(seq)
    UserModel.destroy({
      where: {
        id: id
      }
    }).then(() => {
      console.log('删除', `id: ${id}`)
    })
}

// 获取所有信息
const getInfo = function (seq, ctx) {
  return new Promise((resolve, reject) => {
    const UserModel = test(seq)
    UserModel.findAll().then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}


module.exports = {
    create,
    deleteItem,
    getInfo,
}
```

3、 在handles 下 新建test.js
内容如下
```
const userControllers = require('./../controllers/test')

async function createUser(ctx) {
    await userControllers.create(ctx.sequelize)

    const data = {
        errCode: 0,
        errMsg: '添加数据库成功'
      }
      ctx.body = data;
}

async function deleteItem(ctx) {
    await userControllers.deleteItem(ctx.sequelize, ctx)
    const data = {
      errCode: 0,
      errMsg: '删除成功',
    }
    ctx.body = data
}

async function getInfo(ctx) {
    const info = await userControllers.getInfo(ctx.sequelize, ctx)
    console.log(info, 'info')
    const data = {
        errCode: 0,
        errMsg: 'success',
        data: info
      }
    ctx.body = data
}

module.exports = {
    create:createUser,
    deleteItem,
    getInfo,
}
```
4、 在routers 下 新建test.js 
内容如下
```
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
```
5、在app.js 中新增

```
const userRouter = require('./src/routers/test')
userRouter(app, '/user')
```

### 最后

1、访问 http://localhost:8080/user/allUserInfo  可以使用，同理访问其他也可以使用了

2、配置eslint [参考](https://www.yuque.com/frank-mutde/oo8xng/tfglsf)

3、直接使用mysql [参考](https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-method-define)

4、[sequelize中文文档参考](https://github.com/demopark/sequelize-docs-Zh-CN/tree/master)

