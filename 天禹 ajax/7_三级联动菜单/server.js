//引入express
const express = require('express')
//引入数据库连接模块
const db = require('./db')
//引入模型对象
const citiesModel = require('./model/citiesModel')
//实例一个app应用对象
const app = express()
//使用内置中间件去解析post请求中以urlencoded形式编码的参数
app.use(express.urlencoded({extended:true}))
//暴露静态资源
app.use(express.static(__dirname+'/public'))

db(()=>{

  //获取中国所有省份信息
  app.get('/get_province',(req,res)=>{
    res.set('Access-Control-Allow-Origin','*')
    citiesModel.find({level:1},{province:1,name:1,_id:0},(err,data)=>{
      if(!err && data){
        res.send({status:1,data})
      }else{
        console.log(err)
        res.send({status:0,msg:'当前网络不稳定稍后重试'})
      }
    })
  })

  //根据省份编码，获取该省下所有城市信息
  app.get('/get_cities',(req,res)=>{
    res.set('Access-Control-Allow-Origin','*')
    const {province} = req.query
    citiesModel.find({level:2,province},{city:1,name:1,_id:0},(err,data)=>{
      if(!err && data){
        res.send({status:1,data})
      }else{
        console.log(err)
        res.send({status:0,msg:'当前网络不稳定稍后重试'})
      }
    })
  })

  //根据省份编码，获取该省下所有城市信息
  app.get('/get_counties',(req,res)=>{
    res.set('Access-Control-Allow-Origin','*')
    const {province,city} = req.query
    citiesModel.find({level:3,province,city},{code:1,name:1,_id:0},(err,data)=>{
      if(!err && data){
        res.send({status:1,data})
      }else{
        console.log(err)
        res.send({status:0,msg:'当前网络不稳定稍后重试'})
      }
    })
  })


  app.listen(3000,(err)=>{
    if (err) console.log(err)
    else {
      console.log('服务器启动成功')
    }
  })

},(err)=>{
  console.log(err)
})

