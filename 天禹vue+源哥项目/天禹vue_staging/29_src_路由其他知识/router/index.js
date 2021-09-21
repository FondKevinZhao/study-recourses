/* 该文件是Vue中路由器文件，路由器管理着所有路由 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Message from '../pages/Message.vue'
import Detail from '../pages/Detail.vue'
import News from '../pages/News.vue'
Vue.use(VueRouter)

//创建一个路由器，管理所有的路由
const router = new VueRouter({
	mode:'history',
	routes:[
		{
			// path:'/home*',//开启home的模糊匹配
			path:'/home',
			component:Home,
			children:[
				{
					path:'message',
					component:Message,
					children:[
						{
							// path:'detail/:id/:title/:content', //声明接收params参数
							// path:'detail', //query参数无需声明即可接收
							path:'detail/:id', //同时接收params和query，要先声明params
							component:Detail,
							name:'xiangqing',

							// props:{carName:'马自达·阿特兹'} //通过props映射自定义的静态数据
							// props:true //映射params参数为props传给路由组件
							props(route){ //此处接收到的route是vc或vm身上的$route
								// console.log(route)
								const {id} = route.params
								const {title,content} = route.query
								return {id,title,content}
							}
						}
					]
				},
				{
					path:'news',
					component:News
				}
			]
		},
		{
			path:'/about',
			component:About
		},
		{
			path:'/',
			redirect:'/about' //此处要写路径
		}
	]
})

//暴露路由器
export default router