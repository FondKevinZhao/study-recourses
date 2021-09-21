// import Home from '@/pages/Home'

const Home = () => import('@/pages/Home')//import函数可以让文件单独打包，并且动态加载
const Search = () => import('@/pages/Search')//import函数可以让文件单独打包，并且动态加载

// import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
import MyOrder from '@/pages/Center/MyOrder'
import GroupOrder from '@/pages/Center/GroupOrder'

//使用import  from 这样的方式是同步执行，将所有的路由组件一次性打包在一个大的文件当中
//这样打包之后，打包出来的文件体积比较大，当浏览器在访问这个文件加载的时候，效率不高

//所以我们就想办法将所有的路由组件，分别打包为一个小的文件
//浏览器在访问哪个组件的时候，再去加载哪一个小的文件，效率就会提升

//这个过程就是我们所说的路由懒加载



import store from '@/store'

export default [
  {
    path:'/center',
    component:Center,
    children:[
      {
        path:'myorder',
        component:MyOrder
      },
      {
        path:'grouporder',
        component:GroupOrder
      },
      {
        path:'',
        redirect: 'myorder'
      }
    ]
  },
  {
    path:'/trade',
    component:Trade,
    beforeEnter: (to, from, next) => {
      //只有从购物车界面才能跳转到交易页面
      if(from.path === '/shopcart'){
        next()
      }else{
        alert('只有从购物车界面才能跳转到交易页面')
        next(false)
      }
    }
  },
  {
    path:'/pay',
    component:Pay,
    beforeEnter: (to, from, next) => {
      //只有从购物车界面才能跳转到交易页面
      if(from.path === '/trade'){
        next()
      }else{
        alert('只有从交易页面（创建订单）页面才能跳转到支付页面')
        next(false)
      }
    }
  },
  {
    path:'/paysuccess',
    component:PaySuccess,
    beforeEnter: (to, from, next) => {
      //只有从购物车界面才能跳转到交易页面
      if(from.path === '/pay'){
        next()
      }else{
        alert('只有从支付页面才能跳转到支付成功页面')
        next(false)
      }
    }
  },
  {
    path:'/shopcart',
    component:ShopCart
  },
  {
    path:'/addcartsuccess',
    component:AddCartSuccess,
    //路由独享守卫
    beforeEnter: (to, from, next) => {
    //只有携带了skuNum和sessionStorage内部有skuInfo数据  才能看到添加购物车成功的界面
      let skuNum = to.query.skuNum
      let skuInfo = sessionStorage.getItem('SKUINFO_KEY')
      if(skuNum && skuInfo){
        next()
      }else{
        alert('必须要携带skuNum参数，也必须得存储skuInfo')
        // next('/')
        next(false) //这个是什么都不做
      }
    }
  },
  {
    path:'/detail/:goodsId',
    component:Detail
  },
  {
    path:'/home',
    component:Home
    //component后面可以是一个组件，也可以是一个函数
    //这个函数当用户第一次访问Home组件的时候，就会执行Home函数
  },
  {
    path:'/search/:keyword?', //?代表我的params参数可传可不传
    component:Search,
    name:'search', //命名路由
    // params:{
    //   keyword:'abc',
    // },
    // query:{
    //   keyword1:'ABC'
    // }
    // props: //这个props是我们在路由组建当中操作params参数和query参数的简化方法
    // props:true, //会默认的把传递过来的params参数，额外的映射为组件当中的属性去操作
    // props:{username:'zhaoliying'}  //传递一个对象，传递的是额外你需要的静态数据,不需要就不用
    props:(route) => {
      return {keyword:route.params.keyword,keyword1:route.query.keyword1}
    }
  },
  {
    path:'/login',
    component:Login,
    // 路由对象当中的元配置项，可以配置我们所需要的任何数据
    meta:{
      isHidden:true
    },
    
  },
  {
    path:'/register',
    component:Register,
    meta:{
      isHidden:true
    }
  },
  {
    path:'/',
    redirect:'/home'
  },
  {
    path: '/communication',
    component: () => import('@/pages/Communication/Communication'),
    children: [
      {
        path: 'event',
        component: () => import('@/pages/Communication/EventTest/EventTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'model',
        component: () => import('@/pages/Communication/ModelTest/ModelTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'sync',
        component: () => import('@/pages/Communication/SyncTest/SyncTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'attrs-listeners',
        component: () => import('@/pages/Communication/AttrsListenersTest/AttrsListenersTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'children-parent',
        component: () => import('@/pages/Communication/ChildrenParentTest/ChildrenParentTest'),
        meta: {
          isHideFooter: true
        },
      },
      {
        path: 'scope-slot',
        component: () => import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
        meta: {
          isHideFooter: true
        },
      }
    ],
  },
]  //配置路由