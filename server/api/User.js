const Router = require('koa-router');
const mongoose = require('mongoose');
const router = new Router();
router.get('/',async(ctx) => {
  ctx.body = '用户操作首页'
})
router.post('/regist',async(ctx) => {
  // ctx.body = '用户注册页面'
  const User = mongoose.model('User')
  console.log(ctx.request.body)
  let newUser = new User(ctx.request.body)
  await newUser.save().then(() => {
    ctx.body = {
      code:200,
      message:'注册成功'
    }
  }).catch(err => {
    console.log(err)
    ctx.body = {
      code:500,
      message:err
    }
  })
})
router.post('/login',async(ctx) =>{
  const{ userName,password } = ctx.request.body;
  const User = mongoose.model('User');
  await User.findOne({userName:userName}).exec().then(async(result) => {
    console.log(result)
    if(result){
      let newUser = new User()
      await newUser.comparePassword(password,result.password)
      .then((isMatch) =>{
        ctx.body = {
          code:200,
          message:isMatch
        }
      }).catch(err => {
        ctx.body = {
          code:500,
          message:err
        }
      })
    }else{
      ctx.body = {code:200,message:'用户名不存在'}
    }
  }).catch(err=>{
    ctx.body = {
      code:500,
      message:err
    }
  })
  console.log(userName,password)
})
module.exports = router