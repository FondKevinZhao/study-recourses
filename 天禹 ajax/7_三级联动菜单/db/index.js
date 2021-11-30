//引入mongoose
const mongoose = require('mongoose')
//去连接数据库
mongoose.connect('mongodb://localhost:27017/atguigu',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})

function connectDB(success,error) {
  mongoose.connection.on('open',(err)=>{
    if(!err){
      console.log('DB连接成功')
      success()
    }else{
      error(err)
    }
  })
}

module.exports = connectDB
