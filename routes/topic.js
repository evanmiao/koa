const router = require('koa-router')()
const topicController = require('../controllers/topicController')

router.prefix('/api/v1/topic')

router
  .post('/', topicController.create)  // 创建文章
  .get('/:id', topicController.detail)  // 获取文章详情

module.exports = router