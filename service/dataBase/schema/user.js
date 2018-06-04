const mongoose = require('mongoose');   //引入mongoose
const bcrypt = require('bcrypt'); //引入加密算法
const Schema = mongoose.Schema; //声明Schema
let ObjectId = Schema.Types.ObjectId;   //声明Object类型
//创建用户的Schema
const userSchema = new Schema({
    UserId:ObjectId,
    userName:{unique:true,type:String},
    passWord:String,
    lastLoginAt:{type:Date,default:Date.now()}
})
//密码加密算法
// userSchema.pre('save',(next)=>{
//     console.log(this)
//     bcrypt.genSalt('SALT_WORK_FACTOR',(err,salt)=>{
//         if(err) return next(err)
//         bcrypt.hash(this.passWord,salt,(err,hash)=>{
//             if(err) return next(err)
//             this.passWord = hash
//             next()
//         })
//     })
// })
//发布模型
mongoose.model('User',userSchema)
