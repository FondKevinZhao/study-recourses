//引入express
const express = require('express')
//实例一个app应用对象
const app = express()
//使用内置中间件去解析post请求中以urlencoded形式编码的参数
app.use(express.urlencoded({extended:true}))
//暴露静态资源
app.use(express.static(__dirname+'/public'))

app.get('/get_verify_code',(req,res)=>{
  console.log('有人找我要验证码了')
  setTimeout(()=>{
    let code = Math.floor(Math.random()*8999 + 1000)
    res.send(code.toString())
  },1000)
})

app.listen(3000,(err)=>{
  if (err) console.log(err)
  else {
    console.log('兄弟不要不用编译器打开页面，会产生跨域问题')
    console.log('练习取消ajax请求的地址为：http://localhost:3000/code.html')
  }
})