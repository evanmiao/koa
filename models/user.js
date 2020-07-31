const Sequelize = require('sequelize')
const connection = require('./connection')

const User = connection.define('user', {
  name: {
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
  gender: {
    type: Sequelize.STRING
  },
  signature: {
    type: Sequelize.STRING
  },
  personalWeb: {
    type: Sequelize.STRING
  },
  GitHub: {
    type: Sequelize.STRING
  },
  avatarUrl: {
    type: Sequelize.STRING,
    defaultValue: '/public/images/avatar-default.png'
  },
  integration: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: "用户积分"
  }
})

User.sync()  // 创建表

module.exports = User