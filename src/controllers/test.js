const test = require('../models/test');

// 增加

const create = function (seq) {
  const UserModel = test(seq)
  // UserModel.sync();
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

const getInfo = function (seq) {
  return new Promise((resolve, reject) => {
    const UserModel = test(seq)
    UserModel.findAll().then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
    // 直接使用mysql 语句写
    // seq.query('select * from user').then((res) => {
    //   resolve(res)
    // })
  })
}

module.exports = {
    create,
    deleteItem,
    getInfo,
}

