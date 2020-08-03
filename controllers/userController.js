const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class UserController {
  // 用户注册
  static async signup(ctx) {
    const { body } = ctx.request
    try {
      if (!body.name || !body.password || !body.email) {
        ctx.status = 400
        ctx.body = {
          error: `expected an object with name, password and email but got: ${body}`,
        }
        return
      }
      body.password = await bcrypt.hash(body.password, 5)
      let user = await User.findAll({
        where: {
          name: body.name
        }
      })
      if (!user.length) {
        const newUser = User.build(body)
        user = await newUser.save()
        ctx.status = 200
        ctx.body = {
          message: '注册成功',
          user,
        }
      } else {
        ctx.status = 406
        ctx.body = {
          message: '用户名已经存在',
        }
      }
    } catch (error) {
      ctx.throw(500)
    }
  }

  // 用户登录
  static async signin(ctx) {
    const { body } = ctx.request
    try {
      const user = await User.findAll({
        where: {
          name: body.name
        }
      })
      console.log(user)
      if (!user.length) {
        ctx.status = 401
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
          token: jwt.sign({ data: user }, 'secret', { expiresIn:'1h' })
        }
      } else {
        ctx.status = 401
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
    // await ……
  }

  // 删除用户
  static async delete(ctx) {
    // await ……
  }

  // 重置密码
  static async resetPwd(ctx) {
    // await ……
  }

  // 重置密码
  static async userDetail(ctx) {
    // await ……
  }
}

module.exports = UserController