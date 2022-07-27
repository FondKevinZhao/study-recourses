const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(__dirname + '/public'))

//初始化一个用于保存人的数组
let personArr = [
	{ id: 2, name: 'wade', age: 19 },
	{ id: 1, name: 'kobe', age: 18 },
]

//获取所有人信息
app.get('/get_persons', (req, res) => {
	setTimeout(() => {
		res.send({ status: 1, data: personArr })
	}, 3000)
})

app.listen(3000, (err) => {
	if (!err) console.log('测试xhr-API页面地址为:http://localhost:3000/index.html');
	else console.log(err);
})