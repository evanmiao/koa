const Sequelize = require('sequelize')
const connection = require('./connection')

const Topic = connection.define('topic', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,  // 自增
    primaryKey: true,  // 主键
    unique: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  authorID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    field: 'author_id'
  }
})

Topic.sync()  // 创建表

module.exports = Topic