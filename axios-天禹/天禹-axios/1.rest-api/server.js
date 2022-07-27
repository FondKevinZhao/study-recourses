const express = require('express')
const app = express()
//使用中间件，解析请求体中以urlencoded编码的参数。
app.use(express.urlencoded({extended:true}))
//使用中间件，解析请求体中以json编码的参数。
app.use(express.json())

//准备一些人的数据
let personArr = [
	{id:2,name:'wade',age:19},
	{id:1,name:'kobe',age:18},
]

//获取所有人信息(无需参数)
app.get('/get_all_persons',(req,res)=>{
	res.send({status:1,data:personArr})
})

//根据id获取一个人的信息;   参数名称：id    参数类型：params参数
app.get('/get_person_byid/:id',(req,res)=>{
	const {id} = req.params
	npersonArr = personArr.filter((item)=>{
		return item.id === id*1
	})
	res.send({status:1,data:npersonArr[0]})
})

//添加一个人;  参数名称：name、age    参数类型：请求体参数
app.post('/add_person',(req,res)=>{
	const {name,age} = req.body
	console.log(name,age);
	personArr.push({id:personArr.length+1,name,age})
	res.send({status:1,data:personArr.reverse()[0]})
})

//更新一个人的信息;   参数名称：id、name、age   参数类型：请求体参数
app.post('/update_person',(req,res)=>{
	const {id,name,age} = req.body
	let person = personArr.find((item)=>{return item.id === id*1})
	if(person){
		person.name = name
		person.age = age
		res.send({status:0,data:person})
	}else{
		res.send({status:1,data:'更新出错，未找到对应id'})
	}
})

//删除一个人;   参数名称：id    参数类型：请求体参数
app.post('/delete_person',(req,res)=>{
	const {id} = req.body
	nPersonArr = personArr.filter((item)=>{
		return item.id !== id*1
	})
	if(nPersonArr.length !== personArr.length ){
		personArr = nPersonArr
		res.send({status:0,data:'删除成功'})
	}else{
		res.send({status:1,data:'删除失败'})
	}
})

app.listen(3000,(err)=>{
	if(!err) console.log('服务器运行成功！，端口号为3000，请使用postman工具练习接口测试');
	else console.log(err);
})