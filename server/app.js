const koa = require('koa'); 
const app = new koa(); 
const bodyParser = require('koa-bodyparser'); //获取参数
const cors = require('koa2-cors');
app.use(bodyParser())
app.use(cors())
const mongoose = require('mongoose'); 
const {connect,initSchemas} = require('./dataBase/init');

const Router = require('koa-router');
const user = require('./api/User');
const Goods = require('./api/goods');

let router = new Router();
router.use('/user',user.routes())
router.use('/goods',Goods.routes())


app.use(router.routes())
app.use(router.allowedMethods())

;(async () => {
  await connect()
  initSchemas()
})()
app.listen(3000,()=>{
  console.log('3000 启动成功')
})