// 阿泽：首先要从node模块导入express框架
let express = require('express')
let formidable = require('formidable');

// 阿泽：格式化时间插件
let sd = require("silly-datetime");

let path = require("path");
let fs = require("fs");
let util = require("util");
let bodyParser = require('body-parser');
let del = require('./deldir');

// 阿泽：创建一个express实例
var app = new express();
app.use(express.static('public'));
app.use(express.static('public/dist/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 允许跨域
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'Content-type');
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
  res.header('Access-Control-Max-Age', 1728000);//预请求缓存20天
  next();
});

app.post('/updateimg', (req, res) => {
  // 阿泽：创建一个form实例
  var form = new formidable.IncomingForm()
  // 阿泽：配置存储路径
  form.uploadDir = "./public/blogImg";
  // 阿泽：设定是否保留扩展名
  form.keepExtensions = true;
  if (req.url == '/updateimg' && req.method.toLowerCase() == 'post') {
    form.parse(req, function (err, fields, files) {
      let ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
      let ran = parseInt(Math.random() * 89999 + 10000);
      let extname = path.extname(files.image.name);
      let oldpath = __dirname + '/' + files.image.path
      let newpath = __dirname + '/public/blogImg/' + ttt + ran + extname;
      fs.rename(oldpath, newpath, function (err) {
        console.log('rename callback ', err);
        console.log('有博文配图上传，改名成功，路径为：', newpath)
      });
      let returnpath = '/blogImg/' + ttt + ran + extname;
      //返回一个服务器图片路径
      res.send(returnpath)
    })
  }
})
//监听编辑博文页面的删除图片操作。
app.post('/delBlogImg',(req,res)=>{
  let a = req.body.delName;
  let delPath = './public/blogImg/'+a;
  //删除文件函数
  fs.unlink(delPath, (err) => {
    if (err) throw err;
    console.log('删除该博文配图：'+'./public/blogImg/'+a);
  });
})
app.post('/phototPreview', (req, res) => {
  // 阿泽：创建一个form实例
  var form = new formidable.IncomingForm()
  // 阿泽：配置存储路径
  form.uploadDir = "./public/tempPhoto";
  // 阿泽：设定是否保留扩展名
  form.keepExtensions = true;
  if (req.url == '/phototPreview' && req.method.toLowerCase() == 'post') {
    form.parse(req, function (err, fields, files) {
      let ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
      let ran = parseInt(Math.random() * 89999 + 10000);
      let extname = path.extname(files.imgFile.name);
      let oldpath = __dirname + '/' + files.imgFile.path
      let newpath = __dirname + '/public/tempPhoto/' + ttt + ran + extname;
      fs.rename(oldpath, newpath, function (err) {
        console.log('rename callback ', err);
        console.log('有预览摄影图片上传，改名后存入暂存区，路径为：', newpath)
      });
      let returnpath = '/tempPhoto/' + ttt + ran + extname;
      res.send(returnpath)
    })
  }
})
app.post('/phototPost', (req, res) => {
  // 阿泽：创建一个form实例
  var form = new formidable.IncomingForm()
  // 阿泽：配置存储路径
  form.uploadDir = "./public/photoImg";
  // 阿泽：设定是否保留扩展名
  form.keepExtensions = true;
  if (req.url == '/phototPost' && req.method.toLowerCase() == 'post') {
    form.parse(req, function (err, fields, files) {
      let ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
      let ran = parseInt(Math.random() * 89999 + 10000);
      let extname = path.extname(files.imgFile.name);
      let oldpath = __dirname + '/' + files.imgFile.path
      let newpath = __dirname + '/public/photoImg/' + ttt + ran + extname;
      fs.rename(oldpath, newpath, function (err) {
        console.log('rename callback ', err);
        console.log('有摄影图片提交，改名成功，存储路径为：', newpath)
      });
      let returnpath = '/photoImg/' + ttt + ran + extname;
      res.send(returnpath)

      //阿泽：删除暂存预览图片的文件夹及其所有子文件
      let delpath = __dirname+'/public/tempPhoto/'
      del(delpath)
      //阿泽：重新创建空的、被删除的文件夹
      fs.mkdirSync(delpath,'0755');
    })
  }

})
app.get('/', (req, res) => {
  res.send('测试：hello!您正在使用get请求')
})

// 监听端口，本地使用127.0.0.1:888测试
app.listen(888, () => {
  console.log('hello')
})