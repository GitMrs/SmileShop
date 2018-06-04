const mongoose = require('mongoose');
const glob = require('glob');
const {resolve} = require('path');
const DB_URL='mongodb://localhost/smileVue';
mongoose.Promise = global.Promise
exports.initSchemas = ()=>{
    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}
exports.connect = () =>{
    //连接数据库
    mongoose.connect(DB_URL)
    let maxConnectTimes = 0
    return new Promise((resolve,reject)=>{
        //数据库的监听
        mongoose.connection.on('disconnected',()=>{
            console.log('********数据库断开连接********')
            if(maxConnectTimes<3){
                maxConnectTimes++
                mongoose.connect(DB_URL)
            }else{
                reject()
                throw new Error('********数据库自动连接失败********')
            }
        })
        mongoose.connection.on('error',(err)=>{
            console.log('********数据库发现错误********')
            if(maxConnectTimes<3){
                maxConnectTimes++
                mongoose.connect(DB_URL)
            }else{
                reject(err)
                throw new Error('********数据库自动连接失败********')
            }
        })
        mongoose.connection.on('open',()=>{
            console.log('********数据库打开成功********')
            resolve()
        })
    })
} 
