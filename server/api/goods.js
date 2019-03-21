// 读取json插入数据库中
const Router = require('koa-router');
const mongoose = require('mongoose');
const fs = require('fs');
const router = new Router();
router.get('/insertCategorySub',async(ctx) => {
  fs.readFile('./data_json/category_sub.json','utf8',(err,data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const categorySub = mongoose.model('categorySub');
    data.RECORDS.map((val,index) => {
      let saveSub = new categorySub(val);
      saveSub.save().then(()=>{
        saveCount++
        console.log('成功导入')
      }).catch(err => {
        console.log('导入失败')
      })
    })
  })
})
router.get('/insertCategory',async(ctx) => {
  fs.readFile('./data_json/category.json','utf8',(err,data) => {
    if(err) console.log(err)
    data = JSON.parse(data);
    let saveCount = 0;
    const Category = mongoose.model('category');
    data.RECORDS.map((val,index) => {
      let newCategory = new Category(val)
      newCategory.save().then(()=>{
        saveCount++
        console.log('导入成功')
      }).catch(err =>{
        console.log('导入失败')
      })
    })
  })
})
router.get('/insertGood',async(ctx)=>{
  fs.readFile('./data_json/newGoods.json','utf8',(err,data)=>{
    newData = JSON.parse(data);
    if(err) console.log(err)
    let saveCount = 0;
    const Goods = mongoose.model('goods');
    console.log(newData)
    newData.map((val,index) =>{
      let newGoods = new Goods(val);
      // console.log(newGoods)
      newGoods.save().then(()=>{
        saveCount++
        console.log('第'+ saveCount+ '成功导入')
      }).catch(err => {
        console.log('导入失败')
      }) 
    })
  })
  ctx.body = '商品插入开始'
})



// 详情
router.post('/getDetailGoodInfo',async(ctx)=>{
  const {goodId} = ctx.request.body;
  const Goods = mongoose.model('goods');
  await Goods.findOne({ID:goodId}).exec()
    .then(result => {
      return ctx.body = {
        code:200,
        message:'成功',
        data:result
      }
    }).catch(err => {
      return ctx.body = {
        code:500,
        message:err
      }
    })
})
//分类
router.get('/getCategoryList',async(ctx) => {
  try {
    let Category = mongoose.model('categories');
    let result = await Category.find().exec()
    ctx.body = {
      code:200,
      message:true,
      data:result
    }
  } catch (error) {
    console.log(error)
  }
})
//小类
router.post('/getCategorySubList',async(ctx) => {
 try {
  let categoryId = ctx.request.body.categoryId;
  let CategorySub = mongoose.model('categorysubs');
  let result = await CategorySub.find({MALL_CATEGORY_ID:categoryId}).exec()
  ctx.body = {
    code:200,
    message:true,
    data:result
  }
 } catch (error) {
   console.log(error)
 }

})
//产品
router.post('/getCategorySubGood',async(ctx) => {
  try {
    let categorySubId = ctx.request.body.categorySubId;
    let page = ctx.request.body.page;
    let num = 10;
    let start = (page-1)*num;
    let Goods = mongoose.model('goods');
    let result =await Goods.find({SUB_ID:categorySubId}).skip(start).limit(num).exec()
    ctx.body = {
      code:200,
      message:true,
      data:result
    }

  } catch (error) {
    // console.log(error)
    ctx.body = {
      code:500,
      message:'异常'
    }
  }
})
module.exports = router