let routerApi = require('./router');
let bodyParser = require('body-parser');
let express = require('express');
let app = express();
app.use(bodyParser.json());
app.use('/api',routerApi);

app.listen(3000,()=>{
  console.log('博客项目接口服务启动，3000监听中……')
});
