const Topic = require('../models/topic')
const jwt = require('jsonwebtoken')

class topicController {
  // 创建话题 
  static async create(ctx) {
    const { body } = ctx.request
    const token = ctx.request.header.authorization
    const payload = jwt.verify(token.split(' ')[1], 'secret')
    if (body.title && body.content) {
      body.authorID = payload.id
      try {
        const newTopic = await Topic.create(body)
        const data = await Topic.findByPk(newTopic.id)
        ctx.status = 200
        ctx.body = {
          message: '创建话题成功',
          data
        }
      } catch (error) {
        ctx.throw(500)
      }
    } else {
      ctx.status = 400
      ctx.body = {
        message: '参数错误',
      }
    }
  }

  // 获取话题详情
  static async detail(ctx) {
    const { id } = ctx.params
    if (id) {
      try {
        const data = await Topic.findByPk(id)
        ctx.status = 200
        ctx.body = {
          message: '查询成功',
          data
        }
      } catch (error) {
        ctx.throw(500)
      }
    } else {
      ctx.status = 400
      ctx.body = {
        message: '参数错误'
      }
    }
  }
}

module.exports = topicController