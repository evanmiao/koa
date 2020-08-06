const Sequelize = require('sequelize')
const connection = require('./connection')

const User = connection.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  signature: {
    type: Sequelize.STRING
  },
  avatarUrl: {
    type: Sequelize.STRING,
    defaultValue: '/public/images/avatar-default.png'
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: "用户积分"
  }
})

User.sync()  // 创建表

module.exports = User