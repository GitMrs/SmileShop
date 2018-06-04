const Koa = require('koa');
const mongoose = require('mongoose');
const app = new Koa()
const {connect, initSchemas} = require('./dataBase/init.js')
;(async()=>{
    await connect()
    initSchemas()
    //使用Schemas库里的User表
    const User = mongoose.model("User")
    //声明一个数据
    let oneUser = new User({userName:'陈志鸿',passWord:'aaaaaa'})
    // User.remove({userName:'zz'},(err)=>{
    //     console.log('success')
    // })
    // oneUser.save().then(()=>{
    //     console.log('成功')
    // })
    let users = await User.find({}).exec()
    // console.log('--------------------')
     console.log(users)
    // console.log('--------------------')
})()
app.use(async(ctx)=>{
    ctx.body = '<h1>1111</h1>'
}).listen(3000,()=>{console.log("start")})