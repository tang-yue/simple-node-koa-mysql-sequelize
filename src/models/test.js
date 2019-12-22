const { Sequelize } = require('sequelize')
const moment = require('moment')

const user = function (seq) {
    // 新建表user
    const UserModal = seq.define('user', {
      id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
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