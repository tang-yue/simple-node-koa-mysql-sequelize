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
    ctx.sequelize = seq  // 挂载上下文
    await next()
  }
}
