const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

class UserController {
  // 用户注册
  static async signup(ctx) {
    const { body } = ctx.request
    try {
      if (!body.username || !body.password || !body.email) {
        ctx.status = 400
        ctx.body = {
          error: `expected an object with username, password and email but got: ${body}`,
        }
        return
      }
      body.password = await bcrypt.hash(body.password, 5)
      const username = await User.findOne({
        where: {
          username: body.username 
        }
      })
      if (!(username === null)) {
        ctx.status = 400
        ctx.body = {
          message: '用户名已存在'
        }
        return
      }
      const email = await User.findOne({
        where: {
          email: body.email 
        }
      })
      if (!(email === null)) {
        ctx.status = 400
        ctx.body = {
          message: '邮箱已存在'
        }
        return
      }
      const newUser = await User.create(body)
      ctx.status = 200
      ctx.body = {
        message: '注册成功',
        user: newUser
      }
    } catch (error) {
      ctx.throw(500)
    }
  }

  // 用户登录
  static async signin(ctx) {
    const { body } = ctx.request
    try {
      const user = await User.findOne({
        where: {
          [Op.or]: [
            { username: body.username },
            { email: body.username }
          ]
        }
      })
      if (user === null) {
        ctx.status = 400
        ctx.body = {
          message: '用户名错误',
        }
        return
      }
      // 匹配密码是否相等
      if (await bcrypt.compare(body.password, user.password)) {
        ctx.status = 200
        ctx.body = {
          message: '登录成功',
          // 生成 token 返回给客户端
          token: jwt.sign({ id: user.id, username: user.username }, 'secret', { expiresIn: '4h' })
        }
      } else {
        ctx.status = 400
        ctx.body = {
          message: '密码错误',
        }
      }
    } catch (error) {
      ctx.throw(500)
    }
  }

  // 用户退出
  static async signout(ctx) {
    // await ……
  }

  // 更新用户资料
  static async update(ctx) {
    const { body } = ctx.request
    const token = ctx.request.header.authorization
    const payload = jwt.verify(token.split(' ')[1], 'secret')
    try {
      if (body.username) {
        const username = await User.findOne({
          where: {
            username: body.username
          }
        })
        if (!(username === null)) {
          ctx.status = 400
          ctx.body = {
            message: '用户名已存在',
          }
          return
        }
      }
      if (body.email) {
        const email = await User.findOne({
          where: {
            email: body.email
          }
        })
        if (!(email === null)) {
          ctx.status = 400
          ctx.body = {
            message: '邮箱已存在',
          }
          return
        }
      }
      const res = await User.update({
        username: body.username,
        password: body.password,
        email: body.email
      }, {
        where: {
          username: payload.username
        }
      })
      if (res[0]) {
        ctx.status = 200,
        ctx.body = {
          message: '更新成功'
        }
      }
    } catch (error) {
      ctx.throw(500)
    }
  }

  // 删除用户
  static async delete(ctx) {
    const { body } = ctx.request
    const token = ctx.request.header.authorization
    const payload = jwt.verify(token.split(' ')[1], 'secret')
    try {
      const res = await User.destroy({
        where: {
          username: payload.username
        }
      })
      if (res) {
        ctx.body = {
          message: '删除成功'
        }
      } else {
        ctx.body = {
          message: ''
        }
      }
    } catch (error) {
      ctx.throw(500)
    }
  }

  // 重置密码
  static async resetPwd(ctx) {
    // await ……
  }

  // 用户资料
  static async userDetail(ctx) {
    // await ……
  }
}

module.exports = UserController