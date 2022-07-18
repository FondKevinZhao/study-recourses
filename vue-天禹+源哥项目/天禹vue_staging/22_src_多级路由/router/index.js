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
	routes:[
		{
			path:'/home',
			component:Home,
			children:[
				{
					path:'message',
					component:Message,
					children:[
						{
							path:'detail',
							component:Detail
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
		}
	]
})

//暴露路由器
export default router