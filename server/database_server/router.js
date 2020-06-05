let express = require('express')
let router = express.Router();
let api = require('./api');
//————————Blog博客页面发起的请求————————
// 1.查询图片统计数据
router.get('/getPhotoSumInfo', (req, res, next) => {
  api.getPhotoSumInfo(req, res, next)
})
// 2. 获取博客统计数据
router.get('/getSumInfo', (req, res, next) => {
  api.getSumInfo(req, res, next);
});
// 3. 获取博客列表
router.get('/getBlogList', (req, res, next) => {
  api.getBlogList(req, res, next);
});

//————————Recom推荐页面发起的请求————————
// 1.获取所有用户信息
router.get('/getUserInfo', (req, res, next) => {
  api.getUserInfo(req, res, next);
});

//————————BlogPublish页面发起的请求————————
// 1.上传编辑好的博客信息到数据库
router.post('/saveHtmlContent', (req, res, next) => {
  api.saveHtmlContent(req, res, next);
});

//————————BlogDetail博客详情页面发起的请求————————
// 1.增加此次请求点赞的用户ip，增加点赞数
router.post('/addLikedUserIp', (req, res, next) => {
  api.addLikedUserIp(req, res, next)
})
// 2.移除此次取消点赞的用户ip，减少点赞数
router.post('/removeLikedUserIp', (req, res, next) => {
  api.removeLikedUserIp(req, res, next)
})
// 3.连接博客表和点赞用户IP表，查询符合条件的记录。
router.get('/getBlogDetail', (req, res, next) => {
  api.getBlogDetail(req, res, next);
})

//————————PhotoPublish作品上传页面发起的请求————————
// 1.上传作品信息数据到数据库
router.post('/postPhotoInfo', (req, res, next) => {
  api.postPhotoInfo(req, res, next)
})

//————————Photo图片展示页面发起的请求——————————
// 1.获取图片信息列表
router.get('/getPhotoInfo', (req, res, next) => {
  api.getPhotoInfo(req, res, next)
})

//删除单条记录接口
router.post('/deleteRecord',(req,res,next) => {
  api.deleteRecord(req,res,next)
})
module.exports = router;