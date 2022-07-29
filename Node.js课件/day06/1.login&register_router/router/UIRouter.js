/*
* 专门用于管理展示界面的UI路由
* */

//引入Router构造函数
const {Router} = require('express')
//创建一个Router实例（路由器就是一个小型的app）
let router = new Router()
//引入path模块----Node中内置的一个专门用于解决路径问题的库
let {resolve} = require('path')


//用于展示登录界面的路由，无其他任何逻辑 ----- UI路由
router.get('/login',(req,res)=>{
  let url = resolve(__dirname,'../public/login.html')
  res.sendFile(url)
})

//用于展示注册界面的路由，无其他任何逻辑 ----- UI路由
router.get('/register',(req,res)=>{
  let url = resolve(__dirname,'../public/register.html')
  res.sendFile(url)
})

module.exports = function () {
  return router
}