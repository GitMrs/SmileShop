const mongoose = require('mongoose');
const db = 'mongodb://localhost/smileVue';
const glob = require('glob');
const {resolve} = require('path');

mongoose.Promise = global.Promise
exports.connect = () => {
  let maxConnectTimes = 0;
  mongoose.connect(db)
  return new Promise((resolve, reject) => {
    mongoose.connection.on('disconnected', () => {
      console.log('断开连接')
      if(maxConnectTimes < 3){
        maxConnectTimes++
        mongoose.connect(db)
      }else{
        reject()
        throw new Error('重连次数失败')
      }
    })
    mongoose.connection.on('error', () => {
      console.log('数据库连接异常')
      if(maxConnectTimes < 3){
        maxConnectTimes++
        mongoose.connect(db)
      }else{
        reject(err)
        throw new Error('重连次数失败')
      }
    })
    mongoose.connection.once('open', () => {
      console.log('mongooes connected successfully!')
      resolve()
    })
  })
}
exports.initSchemas = () => {
  glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}