var sqlMap = {
  //删除单条数据接口

  deleteRecord: 'DELETE FROM ?? WHERE id = ?',

  //————————Blog博客页面发起的请求————————
  // 1. 获取博客统计数据
  getSumInfo: 'SELECT SUM(liked_num) AS likednumSum FROM blog_md;' +
    'SELECT SUM(read_num) AS readnumSum FROM blog_md;' +
    'SELECT COUNT(*) AS relaySum FROM blog_md WHERE blog_type = ?;' +
    'SELECT COUNT(*) AS originalSum FROM blog_md WHERE blog_type = ?',
  // 2. 获取图片作品统计数据
  getPhotoSumInfo: 'SELECT COUNT(*) AS photoSum FROM photo_info;' +
    'SELECT SUM(liked_num) AS likednumSum FROM  photo_info;' +
    'SELECT SUM(read_num) AS readnumSum FROM  photo_info;',
  // 3. 获取博客列表
  getBlogList: 'SELECT * FROM blog_md',

  //————————Recom推荐页面发起的请求————————
  // 1.获取所有用户信息
  getUserInfo: 'SELECT * FROM user WHERE name = ?',

  //————————BlogPublish页面发起的请求————————
  saveHtmlContent: 'INSERT INTO blog_md (html_content,md_content,title,save_time,read_num,liked_num,blog_type) VALUES (?,?,?,?,?,?,?)',


  //————————BlogDetail博客详情页面发起的请求————————
  // 1.增加此次请求点赞的用户ip，增加点赞数
  addLikedUserIp: 'INSERT INTO liked_ip (liked_user_ip,blog_id) VALUES (?,?) ;' +
    'UPDATE blog_md SET liked_num=liked_num+1 WHERE id = ?',
  // 2.移除此次取消点赞的用户ip，减少点赞数
  removeLikedUserIp: 'DELETE FROM liked_ip WHERE blog_id = ? and liked_user_ip = ? ;' +
    'UPDATE blog_md SET liked_num = liked_num-1 WHERE id = ?',
  // 3.连接博客表和点赞用户IP表，查询符合条件的记录。
  getBlogDetail: 'SELECT * FROM blog_md WHERE id = ? ; ' +
    'SELECT * FROM  blog_md b inner join liked_ip l on b.id=l.blog_id WHERE b.id = ?;' +
    'UPDATE blog_md SET read_num=read_num+1 WHERE id = ?',

  //————————PhotoPublish作品上传页面发起的请求————————
  postPhotoInfo: 'INSERT INTO photo_info (title,info,url,date) VALUES (?,?,?,CURRENT_TIMESTAMP)',
  
  //————————Photo图片展示页面发起的请求——————————
  getPhotoInfo: 'SELECT * FROM photo_info',

}
module.exports = sqlMap;