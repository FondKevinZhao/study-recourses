//这个文件写的都是函数，我们叫接口请求函数
//以后，我们的每个接口都对应了一个函数，如果想要拿相关接口的数据，只需要调用相关的接口请求函数
//axios使用   函数用法  对象用法
// 三种参数   params参数  query参数  请求体参数
// params参数 是在url当中携带的,属于路径一部分
// query参数，可以在url当中携带 ？分割，后面就是query参数
              // 也可以在配置对象当中配置，配置的属性名叫params
// 请求体参数，在配置对象当中data里面配置，请求方式是put和post才有请求体参数

// axios({
//   url:'localhost:8080/userinfo/1?name=zhaoliying',
//   method:,
//   params:{
//     //代表的是query参数
//     name:'zhaoliying'
//   },
//   data:{
//     //配的是请求体参数
//   }
// })

import request from './ajax'
import mockAjax from '@/api/mockAjax'
//请求三级分类列表数据
///api/product/getBaseCategoryList
//get
//无参
export const reqCategoryList = () => {
  return request({
    url:'/product/getBaseCategoryList',
    method:'get'
  })
}



//验证请求是否成功
// reqCategoryList()    //这里如果要调用，得把模块引入到main当中


//请求获取模拟接口的数据banner和floor

export const reqBannerList = () => {
  return mockAjax({
    url:'/banner',
    method:'get'
  })
}


export const reqFloorList = () => {
  return mockAjax({
    url:'/floor',
    method:'get'
  })
}

//请求获取search页面的数据
// /api/list
// post
// 请求体参数，一个对象
export const reqSearchInfo = (searchParams) => {
  return request({
    url:'/list',
    method:'post',
    data:searchParams//searchParams是用户搜索的参数，这个参数是用户在发请求的时候给传递的
  })
}
//这个请求参数，searchParams必须是一个对象，可以是空对象，但是必须传，不能不传
//其实用户发请求的时候，这个参数给空对象{}，也是可以获取到数据的，代表获取商品默认搜索的数据
// 测试
// reqSearchInfo({})



// 请求获取详情数据
///api/item/{ skuId }
//get

export const reqDetailInfo = (skuId) => {
  return request({
    url:`/item/${ skuId }`,
    method:'get'
  })
}

// 请求添加购物车（修改购物车的商品数量）
// /api/cart/addToCart/{ skuId }/{ skuNum }
// POST
export const reqAddOrUpdateShopCart = (skuId,skuNum) => {
  return request({
    url:`/cart/addToCart/${ skuId }/${ skuNum }`,
    method:'post'
  })
}


//请求获取购物车页面数据
// /api/cart/cartList
// get

export const reqshopCartInfo = () => {
  return request({
    url:'/cart/cartList',
    method:'get'
  })
}


//请求修改购物车选中状态
///api/cart/checkCart/{skuId}/{isChecked}
// GET
export const reqUpdateCartIscheck = (skuId,isChecked) => {
  return request({
    url:`/cart/checkCart/${skuId}/${isChecked}`,
    method:'get'
  })
}


//请求删除购物车数据
///api/cart/deleteCart/{skuId}
//DELETE

export const reqDeleteShopCart = (skuId) => {
  return request({
    url:`/cart/deleteCart/${skuId}`,
    method:'delete'
  })
}


//请求注册用户
///api/user/passport/register
//post
//参数：请求体  code  phone  password


export const reqUserRegister = (userInfo) => {
  return request({
    url:'/user/passport/register',
    method:'post',
    data:userInfo
  })
}

//请求获取用户注册验证码
///api/user/passport/sendCode/{phone}
//get
export const reqGetCode = (phone) => {
  return request({
    url:`/user/passport/sendCode/${phone}`,
    method:'get'
  })
}


//请求用户登录
///api/user/passport/login
//post
//返回   这里返回的东西不严谨，按道理来讲，登录成功以后，只返回token，不会有其它的数据
//而其它的用户数据，需要重新根据token发请求获取（token校验）

// data:{
//   nickName:"Administrator",
//   name:"Admin",
//   token: 90aa16f24d04c7d882051412f9ec45b"
//   }

export const reqUserLogin = (userInfo) => {
  return request({
    url:'/user/passport/login',
    method:'post',
    data:userInfo
  })
}
  

//根据token请求获取用户的信息
///api/user/passport/auth/getUserInfo
//参数token已经在请求头当中添加了
//get

export const reqGetUserInfo = () => {
  return request({
    url:'/user/passport/auth/getUserInfo',
    method:'get'
  })
}


//请求退出登录
///api/user/passport/logout
//get

export const reqUserLogout = () => {
  return request({
    url:'/user/passport/logout',
    method:'get'
  })
}

//请求获取用户的收货地址信息
///api/user/userAddress/auth/findUserAddressList
//get

export const reqUserAddressList = () => {
  return request({
    url:'/user/userAddress/auth/findUserAddressList',
    method:'get'
  })
}

//请求获取订单交易页面信息
///api/order/auth/trade
//get

export const reqTradeInfo = () => {
  return request({
    url:'/order/auth/trade',
    method:'get'
  })
}


// reqUserAddress()
// reqTradeInfo()

//请求提交创建订单
///api/order/auth/submitOrder?tradeNo={tradeNo}
//post

export const reqSubmitOrder = (tradeNo,tradeInfo) => {
  return request({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method:'post',
    data:tradeInfo
  })
}

//请求获取支付信息
// /api/payment/weixin/createNative/{orderId}
//get
export const reqPayInfo = (orderId) => {
  return request({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'get'
  })
}


// 请求获取订单支付状态
// /api/payment/weixin/queryPayStatus/{orderId}
// get

export const reqPayStatus = (orderId) => {
  return request({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
  })
}

//请求获取我的订单列表数据
///api/order/auth/{page}/{limit}
//get

export const reqMyOrderInfo = (page,limit) => {
  return request({
    url:`/order/auth/${page}/${limit}`,
    method:'get'
  })
}

