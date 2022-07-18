//2、引入并声明使用插件
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import routes from './routes'
import store from '@/store'

// VueRouter 是路由器对象的构造函数
// this.$router.push 调用的是路由器对象的方法，这个方法并不是路由器实例化对象的方法，而是这个对象原型的方法
// 这个实例化对象原型的方法 就是VueRouter的显式原型的方法

// this.$router是实例化对象  是VueRouter的实例化对象

//将原有的push方法地址，保存起来，后期还能拿到原来的
const originPush = VueRouter.prototype.push   
const originReplace = VueRouter.prototype.replace   
//可以大胆的去修改原型的push，让原型的push指向另外一个函数
VueRouter.prototype.push = function(location,onResolved,onRejected){
  //location就是我们调用 this.$router.push，传递过来的对象
  // {
  //   name: "search",
  //   params: { keyword: this.keyword || undefined},
  //   query: { keyword1: this.keyword.toUpperCase() },
  // }
  if(onResolved === undefined && onRejected === undefined){
    //证明调用的时候只传递了个匹配路由对象，没有传递成功或者失败的回调
    return originPush.call(this,location).catch(() => {})
  }else{
    //证明调用的时候传递了成功或者失败的回调，或者都有
    return originPush.call(this,location,onResolved,onRejected)
  }
}


VueRouter.prototype.replace = function(location,onResolved,onRejected){
  //location就是我们调用 this.$router.push，传递过来的对象
  // {
  //   name: "search",
  //   params: { keyword: this.keyword || undefined},
  //   query: { keyword1: this.keyword.toUpperCase() },
  // }
  if(onResolved === undefined && onRejected === undefined){
    //证明调用的时候只传递了个匹配路由对象，没有传递成功或者失败的回调
    return originReplace.call(this,location).catch(() => {})
  }else{
    //证明调用的时候传递了成功或者失败的回调，或者都有
    return originReplace.call(this,location,onResolved,onRejected)
  }
}

//3、需要向外暴露一个路由器的对象
const router = new VueRouter({
  routes,
  //配置滚动行为，跳转到新的路由界面滚动条的位置
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

//注册全局前置导航守卫，用来对token校验（根据token获取用户信息）
router.beforeEach(async (to, from, next) => {
  //to  跳转的目的地路由对象
  //from 从哪来的路由对象
  //next 是一个函数
  // 根据参数不同，功能不同
  // next() 代表无条件放行
  // next('/') 代表强制跳转到指定的位置
  // next(false)代表什么都不做，原地不动

  //第一步：守卫拦截住，先去获取用户的token和用户的信息
  let token = store.state.user.token
  let userInfo = store.state.user.userInfo.name

  if(token){
    //如果token是存在的，代表用户登录过
    if(to.path === '/login'){
      //用户已经登录了，还要往登录页面去跳，没必要
      next('/')
    }else{
      // 如果用户已经登录了，但是跳转的不再是登录页，那么我们得看用户的信息获取了没有
      if(userInfo){
        //如果用户的信息已经获取,无条件放行
        next()
      }else{
        //用户已经登录，但是用户还没有获取用户信息，在这里就需要请求获取用户信息
        try {
          //如果获取用户信息成功，用户信息拿到就无条件放行
          await store.dispatch('getUserInfo') //用户根据token获取用户信息 
          next() 
        } catch (error) {
          //根据token获取用户信息失败，代表token可能过期
          //把用户的过期token给清理掉，重新跳转到登录页
          store.dispatch('clearToken')
          next('/login')
        }
      }
    }
  }else{
    //用户根本没登录，
    //目前我们什么都不做，直接放行，后面我们是需要添加功能的
    //如果用户访问的是 交易相关  支付相关 个人中心相关，那么跳转到登录页面
    let targetPath = to.path
    if(targetPath.indexOf('/trade')!==-1 || targetPath.indexOf('/pay')!==-1 || targetPath.startsWith('/center')){
      // next('/login') 这样写可以直接去到登录页，但是登录成功不会去到之前想去的地方
      next('/login?redirect='+targetPath) //想要回到之前想去的地方，必须把想去的那个路径给带到登录里面  
    }else{
      next()
    }
    
  }

})

export default router