//引入express
const express = require('express')
//创建app应用对象
const app = express()
//禁止服务器返回X-Powered-By,为了安全
app.disable('x-powered-by')
//使用内置中间件暴露静态资源，不访问路由直接写文件名+后缀也能看页面
app.use(express.static(__dirname+'/public'))
//引入模型对象，进行CRUD
const usersModel = require('./model/usersModel')
//引入db模块，用于连接数据库
const db = require('./db/db')
//使用内置中间件用于解析post请求的urlencoded参数
app.use(express.urlencoded({extended:true}))

//逻辑：如果数据库连接成功，随后立即启动服务器，在整个过程中，无论多少次请求，数据库只连接一次。
db(()=>{
  //用于展示登录界面的路由，无其他任何逻辑 ----- UI路由
  app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/public/login.html')
  })

  //用于展示注册界面的路由，无其他任何逻辑 ----- UI路由
  app.get('/register',(req,res)=>{
    res.sendFile(__dirname+'/public/register.html')
  })

  //用于处理用户的注册请求，有很多业务逻辑(校验数据的有效性等) -------- 业务路由
  app.post('/register',(req,res)=>{
    /*
     { email: 'kobe@qq.com',
       nick_name: 'kobe',
       password: '123',
       re_password: '123' }
   */
    //1.获取用户的输入
    const {email,nick_name,password,re_password} = req.body
    /*
    * 2.校验数据的合法性:(一般是前台和后台同时验证。)
    *     2.1：校验成功
    *           -去数据库中查找该邮箱是否注册过
    *               2.1.1：注册过：提示用户邮箱已被占用。
    *               2.1.2：未注册：写入数据库
    *     2.2：校验失败
    *           -提示用户具体哪里输入的不正确
    * */

    //校验邮件的正则表达式
    const emailReg = /^[a-zA-Z0-9_]{4,20}@[a-zA-Z0-9]{2,10}\.com$/
    //校验昵称的正则表达式
    const nickNameReg = /[\u4e00-\u9fa5]/gm
    //校验密码的正则表达式
    const passwordReg = /^[a-zA-Z0-9_@#.+&]{6,20}$/

    //使用正则去校验
    if(!emailReg.test(email)){
      res.send('邮箱格式不合法，用户名必须4-20位，主机名必须2-10位')
    }else if(!nickNameReg.test(nick_name)){
      res.send('昵称格式不合法，必须为中文')
    }else if(!passwordReg.test(password)){
      res.send('密码格式不合法，必须6-20')
    }else if( password !== re_password){
      res.send('两次输入密码不一致')
    }else{
      //去数据库中查询该邮箱是否注册过
      usersModel.findOne({email},function (err,data) {
        if(data){
          //如果注册过
          //引入计数模块--当达到一个敏感的阈值，触发安全性机制。
          console.log(`邮箱为${email}的用户注册失败，因为邮箱重复`)
          res.send('该邮箱已被注册，请更换邮箱')
        }else{
          //如果没有注册过
          usersModel.create({email,nick_name,password},function (err) {
            if(!err){
              //如果写入成功了
              console.log(`邮箱为${email}的用户注册成功`)
              res.send('注册成功了')
            }else{
              //如果写入失败了
              //引入报警模块，当达到敏感阈值，触发报警。
              console.log(err)
              res.send('您当前的网络状态不稳定，稍后重试')
            }
          })
        }
      })
    }
  })

  //用于处理用户的登录请求，有很多业务逻辑(校验数据的有效性等) -------- 业务路由
  app.post('/login',(req,res)=>{
    //1.获取输入
    const {email,password} = req.body
    //2.准备正则
    const emailReg = /^[a-zA-Z0-9_]{4,20}@[a-zA-Z0-9]{2,10}\.com$/
    const passwordReg = /^[a-zA-Z0-9_@#.+&]{6,20}$/
    if(!emailReg.test(email)){
      res.send('邮箱格式不合法，用户名必须4-20位，主机名必须2-10位')
    }else if(!passwordReg.test(password)){
      res.send('密码格式不合法，必须6-20')
    }else{
      //3.去数据库中查找：
      usersModel.findOne({email,password},(err,data)=>{
          if(err){
            //引入报警模块，当达到敏感阈值，触发报警。
            console.log(err)
            res.send('网络不稳定，稍后重试')
            return
          }
          if(data){
            res.redirect('https://wwww.baidu.com')
            return
          }
          res.send('用户名或密码输入错误！')
      })
    }
  })

  //绑定端口监听
  app.listen(3000,(err)=>{
    if(!err) console.log('服务器启动成功！')
    else console.log(err)
  })
},(err)=>{
  console.log('数据库连接失败',err)
})
