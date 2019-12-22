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

