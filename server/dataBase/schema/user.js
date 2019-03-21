const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); //数据加密
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
var SALT_WORK_FACTOR = 10;
const userSchema = new Schema({
  UserId:ObjectId,
  userName:{unique:true,type:String},
  password:String,
  createAt:{type:Date,default:Date.now()},
  lastLoginAt:{type:Date,default:Date.now()}
},{
  // collection:'user' //数据库错误是可以使用user 代替 userName 
})
userSchema.pre('save',function(next){
  bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt) => {
    if(err) return next(err)
    bcrypt.hash(this.password,salt,(err,hash)=>{
      if(err) return next(err)
      this.password = hash
      next()
    })
  })
})
userSchema.methods = {
  comparePassword:(_password,password)=>{
    return new Promise((resolve,reject) => {
      bcrypt.compare(_password,password,(err,isMatch) => {
        if(!err) resolve(isMatch)
        else reject(err)
      })
    })
  }
}
mongoose.model("User",userSchema)
