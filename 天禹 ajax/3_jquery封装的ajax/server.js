//引入express
const express = require('express')
//实例一个app应用对象
const app = express()
//使用内置中间件去解析post请求中以urlencoded形式编码的参数
app.use(express.urlencoded({extended:true}))
//暴露静态资源
app.use(express.static(__dirname+'/public'))

app.get('/test_get',(req,res)=>{
  console.log(req.query)
  res.send('你发来的是get请求，我收到了，这是给你的数据：哈哈')
})

app.post('/test_post',(req,res)=>{
  console.log(req.body);
  res.send('你发来的是post请求，我收到了，这是给你的数据：哈哈')
})

app.listen(3000,(err)=>{
  if (err) console.log(err)
  else {
    console.log('兄弟不要不用编译器打开页面，会产生跨域问题')
    console.log('测试jquery发送ajax请求的地址是：http://localhost:3000/jquery_ajax.html')
  }
})