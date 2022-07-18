const express = require('express')
const app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(__dirname+'/public'))

app.get('/test_get',(req,res)=>{
  const {callback} = req.query
  console.log(callback)
  let person = [{name:'kobe',age:18},{name:'kobe',age:18},{name:'kobe',age:18},{name:'kobe',age:18}]
  res.send(`${callback}(${JSON.stringify(person)})`)
})

app.listen(3000,(err)=>{
  if (err) console.log(err)
  else {
    console.log('兄弟必须要用编译器打开页面，你要解决跨域问题')
  }
})