const fs = require('fs')
fs.readFile('./data_json/goods.json','utf8',function(err,data) {
  let newData = JSON.parse(data)
  let i = 0;
  let pushData = []
  newData.RECORDS.map(function(value,index){
    if(value.IMAGE1 != null){
      i++
      pushData.push(value)
    }
  })
  fs.writeFile('./data_json/newGoods.json',JSON.stringify(pushData) ,function(err){
    if(err) console.log('失败')
    else console.log('成功')
  })
  // console.log(i)
  // console.log(pushData)
})