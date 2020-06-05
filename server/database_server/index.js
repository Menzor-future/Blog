let routerApi = require('./router');
let bodyParser = require('body-parser');
let express = require('express');
let app = express();
app.use(bodyParser.json());
app.use('/api',routerApi);

app.listen(3000,()=>{
  console.log('success listen at port:3000......')
});
