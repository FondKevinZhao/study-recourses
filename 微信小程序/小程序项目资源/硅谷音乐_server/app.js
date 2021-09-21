const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const request = require('./util/request')
const packageJSON = require('./package.json')
const exec = require('child_process').exec
const cache = require('apicache').middleware
const Fly=require("flyio/src/node");
const jwt = require('jsonwebtoken');
const fly=new Fly;


const app = express()

// CORS & Preflight request
app.use((req, res, next) => {
  if(req.path !== '/' && !req.path.includes('.')){
    res.set({
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': req.headers.origin || '*',
      'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
      'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
      'Content-Type': 'application/json; charset=utf-8'
    })
  }
  req.method === 'OPTIONS' ? res.status(204).end() : next()
})

// cookie parser
app.use((req, res, next) => {
  req.cookies = {}, (req.headers.cookie || '').split(/\s*;\s*/).forEach(pair => {
    let crack = pair.indexOf('=')
    if(crack < 1 || crack == pair.length - 1) return
    req.cookies[decodeURIComponent(pair.slice(0, crack)).trim()] = decodeURIComponent(pair.slice(crack + 1)).trim()
  })
  next()
})

// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// cache
app.use(cache('2 minutes', ((req, res) => res.statusCode === 200)))

// static
app.use(express.static(path.join(__dirname, 'public')))


// 注册获取用户唯一标识的接口
app.use('/getOpenId', async (req, res, next) => {
  let code = req.query.code;
  let appId = 'wx810e8b1fde386fde';
  let appSecret = '8bb909649da12002fba7a47f5ac3791b';
  let url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`
  // 发请求给微信服务器获取openId
  let result = await fly.get(url);
  let openId = JSON.parse(result.data).openid;
   console.log('openId', openId);
   // 自定义登录态
   let person = {
     username: '北方汉子',
     age: 18,
     openId
   }
   // 对用户的数据进行加密，生成token返回给客户端
  let token = jwt.sign(person, 'atguigu');
  console.log(token);
  // 验证身份，反编译token
  let result2 = jwt.verify(token, 'atguigu');
  console.log(result2);
  res.send(token);
});



// router
const special = {
  'daily_signin.js': '/daily_signin',
  'fm_trash.js': '/fm_trash',
  'personal_fm.js': '/personal_fm'
}

fs.readdirSync(path.join(__dirname, 'module')).reverse().forEach(file => {
  // console.log(file);
  if(!file.endsWith('.js')) return
  // album_newest.js  ---> /album_newest.js ---> /album_newest ---> /album/newest
  let route = (file in special) ? special[file] : '/' + file.replace(/\.js$/i, '').replace(/_/g, '/')
  let question = require(path.join(__dirname, 'module', file))

  app.use(route, (req, res) => {
    console.log(route);
    console.log(req)
    console.log('------');
    console.log(req.cookies)
    let query = Object.assign({}, req.query, req.body, {cookie: req.cookies})
    question(query, request)
      .then(answer => {
        console.log('[OK]', decodeURIComponent(req.originalUrl))
        res.append('Set-Cookie', answer.cookie)
        res.status(answer.status).send(answer.body)
      })
      .catch(answer => {
        console.log('[ERR]', decodeURIComponent(req.originalUrl))
        if(answer.body.code == '301') answer.body.msg = '需要登录'
        res.append('Set-Cookie', answer.cookie)
        res.status(answer.status).send(answer.body)
      })
  })
})

const port = process.env.PORT || 3000
const host = process.env.HOST || ''

app.server = app.listen(port, host, () => {
  console.log('欢迎使用硅谷云音乐服务器');
  console.log('服务器地址： http://localhost:3000')
})

module.exports = app
