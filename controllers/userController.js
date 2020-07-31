const User = require('../models/user')
const jwt = require('jsonwebtoken')

class UserController {
  // 用户注册
  static async signup(ctx) {
    const { body } = ctx.request
    try {
      if (!body.username || !body.password) {
        ctx.status = 400
        ctx.body = {
          error: `expected an object with username, password but got: ${body}`,
        }
        return
      }
      body.password = await bcrypt.hash(body.password, 5)
      let user = await User.find({ username: body.username })
      if (!user.length) {
        const newUser = new User(body)
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
    const token = jwt.sign({},'secret',{ expiresIn:'1h' })
    ctx.body = token
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