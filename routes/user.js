const router = require('koa-router')()
const userController = require('../controllers/userController')

router.prefix('/api/v1/user')

router
  .post('/signup', userController.signup)  // 用户注册      
  .post('/signin', userController.signin)  // 用户登录
  .get('/signout', userController.signout)  // 用户退出      
  .put('/update', userController.update)  // 更改用户资料
  .put('/resetPwd', userController.resetPwd)  // 重置用户密码
  .delete('/delete', userController.delete)  // 删除用户
  .get('/:id', userController.userDetail)  // 用户资料

module.exports = router