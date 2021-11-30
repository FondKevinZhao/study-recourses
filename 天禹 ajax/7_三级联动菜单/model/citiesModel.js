//引入mongoose
const mongoose = require('mongoose')

//引入Schema
const {Schema} = mongoose

//创建约束
const citiesRules = new Schema()

//创建模型对象
module.exports = mongoose.model('cities',citiesRules)
