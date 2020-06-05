const mysql = require('mysql');
const dbConfig = require('./db');
const sqlMap = require('./sqlMap')

const pool = mysql.createPool({
  host: dbConfig.mysql.host,
  user: dbConfig.mysql.user,
  password: dbConfig.mysql.password,
  database: dbConfig.mysql.database,
  port: dbConfig.mysql.port,
  multipleStatements: true    // 多语句查询
})
module.exports = {
//删除单条数据接口
  deleteRecord(req, res, next) {
    pool.getConnection((err, connection) => {
      let sql = sqlMap.deleteRecord;
      let thedatabase = req.body.thedatabase;
      let id = req.body.id;
      connection.query(sql, [thedatabase, id], (err, result) => {
        res.json(result)
        console.log('result:', result)
        console.log('err', err)
        connection.release();
      })
    })
  },
  //————————Blog博客页面发起的请求————————
  // 1.查询图片统计数据
  getPhotoSumInfo(req, res, next) {
    pool.getConnection((err, connection) => {
      let sql = sqlMap.getPhotoSumInfo;
      connection.query(sql, (err, result) => {
        res.json(result)
        console.log('result:', result)
        console.log('err', err)
        connection.release();
      })

    })
  },
  // 2. 获取博客统计数据
  getSumInfo(req, res, next) {
    pool.getConnection((err, connection) => {
      let sql = sqlMap.getSumInfo;
      connection.query(sql, ['转载', '原创'], (err, result) => {
        res.json(result)
        // console.log('result:', result)
        console.log('err', err)
        connection.release();
      })
    })
  },
  // 3. 获取博客列表
  getBlogList(req, res, next) {
    pool.getConnection((err, connection) => {
      let sql = sqlMap.getBlogList;
      connection.query(sql, (err, result) => {
        // console.log('result:', result);
        console.log('err', err);
        res.json(result);
        connection.release();
      })
    })
  },
  //————————Recom推荐页面发起的请求————————
  // 1.获取所有用户信息
  getUserInfo(req, res, next) {
    var name = req.query.name;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.getUserInfo;
      connection.query(sql, [name], (err, result) => {
        res.json(result)
        console.log('err', err)
        connection.release();
      })
    })
  },
  //————————BlogPublish页面发起的请求————————
  // 1.上传编辑好的博客信息到数据库
  saveHtmlContent(req, res, next) {
    // console.log(req.body);
    let htmlcontent = req.body.html_content;
    let mdcontent = req.body.md_content;
    let title = req.body.title;
    let save_time = req.body.save_time;
    let read_num = req.body.read_num;
    let liked_num = req.body.liked_num;
    let blog_type = req.body.blog_type;
    pool.getConnection((err, connection) => {
      let sql = sqlMap.saveHtmlContent;
      connection.query(sql, [htmlcontent, mdcontent, title, save_time, read_num, liked_num, blog_type], (err, result) => {
        res.json(result)
        // console.log('result:', result)
        console.log('err', err)
        connection.release();
      })
    })
  },
  //————————BlogDetail博客详情页面发起的请求————————
  // 1.增加此次请求点赞的用户ip，增加点赞数

  addLikedUserIp(req, res, next) {
    let liked_user_ip = req.body.liked_user_ip;
    let id = req.body.id;
    pool.getConnection((err, connection) => {
      let sql = sqlMap.addLikedUserIp;
      connection.query(sql, [liked_user_ip, id, id], (err, result) => {
        res.json(result);
        // console.log('result:',result);
        console.log('err', err);
        connection.release();
      })
    })
  },
  // 2.移除此次取消点赞的用户ip，减少点赞数

  removeLikedUserIp(req, res, next) {
    let removeIp = req.body.removeIp;
    let blog_id = req.body.id;
    pool.getConnection((err, connection) => {
      let sql = sqlMap.removeLikedUserIp;
      connection.query(sql, [blog_id, removeIp, blog_id], (err, result) => {
        res.json(result);
        // console.log('result:',result);
        console.log('err', err);
        connection.release();
      })
    })
  },
  // 3.连接博客表和点赞用户IP表，查询符合条件的记录。
  getBlogDetail(req, res, next) {
    pool.getConnection((err, connection) => {
      let sql = sqlMap.getBlogDetail;
      let id = req.query.id;
      // console.log(req)
      connection.query(sql, [id, id, id], (err, result) => {
        // console.log('result:', result);
        console.log('err', err);
        res.json({ result, ip: req.ip });

        connection.release();
      })
    })
  },
  //————————PhotoPublish作品上传页面发起的请求————————
  // 1.上传作品信息数据到数据库
  //上传作品信息api
  postPhotoInfo(req, res, next) {
    let title = req.body.title;
    let info = req.body.info;
    let url = req.body.url;
    pool.getConnection((err, connection) => {
      let sql = sqlMap.postPhotoInfo;
      connection.query(sql, [title, info, url], (err, result) => {
        console.log(err)
        // console.log(result)
        res.json(result);
        connection.release();
      })
    })
  },

  //————————Photo图片展示页面发起的请求——————————
  // 1.获取图片信息列表
  getPhotoInfo(req, res, next) {
    pool.getConnection((err, connection) => {
      let sql = sqlMap.getPhotoInfo;
      connection.query(sql, (err, result) => {
        console.log(err)
        // console.log(result)
        res.json(result);
        connection.release();
      })
    })
  }
}