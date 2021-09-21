## 1.Vue脚手架说明
		1.文件结构分析
					|-- node_modules
					|-- public
							|-- index.html: 主页面文件
					|-- src
						|-- main.js: 应用入口js
					|-- babel.config.js: babel的配置文件
					|-- vue.config.js: vue的配置文件，需要手动添加
					|-- .gitignore: git版本管制忽略的配置
					|-- package.json: 应用包配置文件 
					|-- README.md: 应用描述说明的readme文件
		2.关于h函数说明
					vue.runtime.common.js（项目中用的多） : 
							1.不包含模板解析器，打包后体积小
							2.配置项中的不能写template，要用render: h => h(App)代替
					vue.js : 
							1.包含解模板析器，打包后体积大
							2.配置可以写template

## 2.ref与props
		1.ref的用法：
				(1).给组件标签指定ref：<Demo ref="xxxx"/>，获取到的是组件实例对象——vc
				(2).给html标签指定ref：<input ref="xxxx"/>，获取到的是真实DOM节点
				(3).通过this.$refs获取
		2.props的用法
				(1).传递props：
							<Demo :a="xxx"/>
				(2).接收props：
							第一种方式（只声明）：
								props:['userName'] 
	
							第二种方式（限制类型）：
								props:{
									userName:Number
								}
	
							第三种方式（限制类型、属性，指定默认值）：
								props:{
									userName:{
										type:String, //类型
										required:true, //必要性
										default:'老王' //默认值
									}
								}

## 3.样式scoped属性、组件name配置、eslint语法检查
			(1).scoped可以让样式在局部生效
			(2).name可以给组件命名
			(3.)语法检查配置
						第一种方式：/*eslint-disable-next-line*/
						第二种方式：/*eslint-disable*/
						第三种方式：vue.confog.js中配置

## 4.todoList案例
		(1).组件data中的数据、接到的props、methods中的方法、computed中的属性，通过vc均可读取。
		(2).<input v-model="x" @click="demo"/> 会先执行demo函数，在维护x的值。
		(3).使用计算属性时，只是读取用get即可，修改记得要用set
		(4).methods、computed、watch并没有严格意义上的界定，视具体功能而定，有时用什么都可以实现。

## 5.浏览器本地存储(WebStorage)
		(1). Cookie、SessionStorage、LocalStorage均被用来在浏览器端存储数据，且都是字符串类型的键值对！
		(2). 注意：session和SessionStorage不是一个概念！！！
				 在服务端有一种存储方式叫做：session会话存储，常常被简称session。
				 SessionStorage和LocalStorage都是浏览器本地存储，统称为Web Storage。
		(3). 存储内容大小一般支持5-10MB
		(4). 浏览器端通过 Window.sessionStorage 和 Window.localStorage 属性来实现本地存储机制。
		(5). 相关API：
					1. localStorage.setItem('key', 'value');
								该方法接受一个键名和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。
					2. var data = xxxxxStorage.getItem('person');
								该方法接受一个键名作为参数，返回键名对应的值。
					3. xxxxxStorage.removeItem('key');
								该方法接受一个键名作为参数，并把该键名从存储中删除。
					4. xxxxxStorage.clear()
								调用该方法会清空存储中的所有键名
		(6).备注：
						1.SessionStorage存储的内容会随着浏览器窗口关闭而消失。
						2.LocalStorage存储的内容，需要手动清除才会消失。
						3.xxxxxStorage.getItem(xxx)如果xxx对应的value获取不到，那么getItem的返回值是null
						4.JSON.parse(null)的结果依然是null

## 6.todoList案例_本地存储版
		(1).解析LocaStorage中数据时要记得使用try{} catch(){} 处理解析异常
		(2).使用watch时根据数据的具体结构，决定是否采用深度监视
		(3).深度监视：
					(1).Vue中watch中配置的监视，默认只能监测自身一层的数据
					(2).配置deep:true可以检测所有层次的数据

## 7.自定义事件
		一种组件间通信的方式，适用于：子 ===> 父
		(1).绑定自定义事件：
				第一种方式：
						<Demo @haha="test"/>
				第二种方式：
						<Demo ref="demo"/>
						mounted中：this.$refs.demo.$on('haha',this.test)
		(2).触发自定义事件：
						this.$refs.header.$on('add-todo',this.addTodo)
		(3).备注：
					1.A组件想接收B组件传递的数据，那就：在A组件中给B组件绑定自定义事件，事件的回调在是在A组件自身
					2.自定义事件的回调在哪，哪才能接受到数据
					3.适用于 子 ===> 父

## 8.全局事件总线(GlobalEventBus)
		一种组件间通信的方式，适用于任意组件间通信
		(1).安装全局事件总线，在main.js中配置
					new Vue({
						.....
						beforeCreate() {
							Vue.prototype.$bus = this //安装事件总线
						},
						......
					})
		(2).A组件想接受数据，则在A组件中给$bus绑定自定义事件,回调留在A组件自身
					mounted() {
						this.$bus.$on('xxxx',this.yyyyy)
					}
				备注：上方的yyyy是回调，yyy需要配置在组件的methos属性中
		(3).要提供数据的组件中触发事件：this.$bus.$emit('xxxx',数据)
		(4).备注：
						1.谁接数据，谁就$on('xxx-xxx',this.yyy)
						2.谁发数据，谁就$emit('xxx-xxxx',数据)
						3.上方的数据可以传递多个，例如$emit('xxx-xxxx',数据1,数据2，数据3)
							但一般传递多个的时候，我们包装成一个对象传递

## 9.slot插槽
		也算是一种组件间通信的方式，适用于 父===>子，且传递的是html结构
		(1).作用：父组件向子组件指定位置中插入html结构
		(2).分类：
				默认插槽：<slot></slot>
				命名插槽：<slot name="s1"></slot>
				作用域插槽：后期项目中会讲到
		(3).使用：	
					父组件中：
							<template slot="s1">
								具体html结构
							</template>
					子组件中：
							<slot></slot> 或 <slot name="s1"></slot>

## 10.vue-resource
		vue1.x时期用于发送网络请求的库，现已弃用，了解即可

## 11.求和案例vuex版
		(1).项目根目录创建：vuex/store.js 
					(1.1)应用Vuex插件
					(1.2)创建store并管理：state、actions、mutations对象
		(2).组件中读取状态：$store.state.xxxx
		(3).组件中更新状态：$store.dispatch('动作名',数据)
		(4).actions中可以写业务逻辑、开启异步任务，若actions中没有任何逻辑，
				可以在组件中直接$store.commit()去直接对话mutations进行更新状态
		(5).mutations中尽量不写业务逻辑，不写异步任务，只负责加工状态。

## 12.Vuex中的getters
			(1).作用：Vuex中的数据想要经过处理后再使用，可以使用getters
			(2).写法：
				const getters = {
					bigSum(state){
						return state.sum * 100
					}
				}
			(3).备注：getters不是必须要用，也可以用computed、methods、过滤器实现

## 13.Vuex优化版
		优化1：将$store.state.xxxx 写成 computed
		优化2：
					使用：mapState、mapGetters自动生成原本我们亲自在computed中写的属性
					使用：mapMutations、mapActions自动生成原本我们亲自在methods中写的回调
		注意：以上所有mapXxxx方法在使用时：
						1.若组件中用的名字 等于 actions、state、mutations、getters中的名字可以简写成数组
						2.若组件中用的名字 不等于 actions、state、mutations、getters中的名字要写成对象

## 14.路由的基本使用
		(1).用到的插件库：vue-router
		(2).创建路由器: router/index.js
					new VueRouter({
						mode:'hash/history'
						routes: [
							{
								path: '/about',
								component: About
							}
						]
					})
	(3).注册路由器: main.js
					import router from './router'
					new Vue({
						router
					})
	(4).使用路由组件标签:
					<router-link to="/home">首页</router-link> //导航区
					<router-view></router-view> //展示区
	(5). 两个重要对象
	    $router: 代表路由器对象, 包含一些实现路由跳转/导航的方法: push()/replace()/back()
	    $route: 代表当前路由对象, 包含一些路由相关的属性: path/params/query

## 15.嵌套路由
			routes:[
				{
					path:'/home',
					component:Home,
					children:[
						{
							path:'message',
							component:Message,
						},
						{
							path:'news',
							component:News
						}
					]
				}
			]

## 16.路由params参数
			(1).注册路时声明接收：params：path:'detail/:id'
			(2).路由链接：<router-link to="/home/message/detail/001">点我</router-link>
			(3).路由组件中接收：this.$route.params.id

## 17.路由query参数
			(1).注册路时无需声明接收：params：path:'detail'
			(2).路由链接：<router-link to="/home/message/detail?id=001">点我</router-link>
			(3).路由组件中接收：this.$route.query.id





## 18.命名路由
		配置：
				{
					path:'news',
					component:News,
					name:'xinwen' //路由名
				}
		作用：简化跳转与传参
				传统写法：<router-link to="/demo/001?title=标题1">点我</router-link>
				简化写法：<router-link :to="{
										name:'xinwen',
										params:{id:'001'},
										query:{	title:'标题1'}
									}">
									点我
									</router-link>

## 19.路由的props配置：
			第一种写法：props:{carName:'马自达·阿特兹'} //通过props映射自定义的静态数据
	
			第二种写法：props:true //映射params参数为props传给路由组件
	
			第三种写法：props(route){ //此处接收到的route是vc或vm身上的$route
										const {id} = route.params
										const {title,content} = route.query
										return {id,title,content}
									}

## 20.编程式路由导航
			1.this.$router.push(path): 相当于点击路由链接(可以返回到当前路由界面)
			2.this.$router.replace(path): 用新路由替换当前路由(不可以返回到当前路由界面)
			3.this.$router.back(): 请求(返回)上一个记录路由
			4.this.$router.go(-1): 请求(返回)上一个记录路由
			5.this.$router.go(1): 请求下一个记录路由

## 21.缓存路由组件
			作用：让路由组件切换时，不销毁
			<keep-alive include="News">
				<router-view></router-view>
			</keep-alive>

## 22.路由的其他知识
			(1).路由模式：mode:history/hash
			(2).redirect：
						{
							path:'/',
							redirect:'/about' //此处要写路径
						}
			(3).模糊匹配：path:'/home*'
			(4).路由组件中的异步任务:
						watch:{
							$route:{
								immediate:true,
								deep:true,
								handler(route){
									setTimeout(()=>{
										this.content = route.query.content
									},500)
								}
							}
						}

## 23.配置代理
				参考：vue脚手架配置代理.md

## 24.Element-UI按需引入
			(1).yarn add element-ui
			(2).修改babel.config.js如下：
							module.exports = {
								presets: [
									'@vue/cli-plugin-babel/preset',
									["@babel/preset-env", { "modules": false }]
								],
								plugins:[
									[
										"component",
										{
											"libraryName": "element-ui",
											"styleLibraryName": "theme-chalk"
										}
									]
								]
							}
			(3).main.js中：
						import { Button,Input } from 'element-ui';
						Vue.component(Button.name, Button);

## 25.axios拦截器
		(1).axios请求拦截器:
					1.是什么？
							在真正发请求前执行的一个回调函数
					2.作用：
							对每次请求做一些处理，例如：统一直追加某些请求头、处理参数等
		(2).axios响应拦截器:
					1.是什么？
							得到响应之后执行的两个回调函数（一个给成功用，一个给失败用）
					2.作用：
							若请求成功，对成功的数据进行处理
							若请求失败，对失败进行进一步操作

## 26.组件间通信方式总结
			组件之间的关系:
					1.父子
					2.祖孙
					3.兄弟
					4.其它
			vue组件间通信方式:
					1.props
					2.自定义事件  
					3.全局事件总线
					4.消息订阅与发布
					5.slot插槽
					6.vuex

			1.props:
				1.此方式用于父组件与子组件之间传递数据
				2.所有标签属性都会成为组件对象的属性, 模板页面可以直接引用
					问题: 
						1.如果需要向非子后代传递数据必须多层逐层传递
						2.兄弟组件间也不能直接props通信, 必须借助父组件才可以

			2.vue自定义事件
				1. 用来实现子组件向父组件通信的方式, 功能类似于函数类型的props
				2. 实现流程
						(1)	父组件: 
									1.组件标签属性或mounted(): 给子组件对象绑定事件监听, 用于接收数据
									2.在beforeDestroy(): 通过子组件对象解绑对应的事件监听
						(2)	子组件: 
									通过当前组件对象分发事件, 传递数据值

			3.消息订阅与发布
					1. 消息订阅与发布与全局事件总线一样都可以实现任意组件间通信
					2. 但需要额外引入第三方实现库, 而全局事件总线不用, 一般在vue项目中不用
					3. 实现流程
						(1)	在接收数据的组件: 
							1.mounted(): 订阅消息, 在回调函数中接收数据并处理
							2.beforeDestroy(): 取消订阅
						(2)	在发送数据的组件: 发布消息

			4.slot插槽
					1. 当一个组件有不确定的结构时, 就需要使用slot技术
					2. 注意: 插槽内容是在父组件中编译后, 再传递给子组件
						(1)	当只有一个不确定的结构时, 可以使用默认slot
						(2)	当有多个不确定的结构时, 可以使用命名slot
					3. 特殊情况：如果决定结构的数据在子组件, 那需要使用作用域插槽


			5.全局事件总线
					1. 全局事件总线是任意关系的组件间通信(传值/数据)的解决方案
					2. 全局事件总线是一个对象, 有事件处理的相关方法, 在vue中就是vm对象
					3. 实现流程
							(1)	将新创建的vm或最外层已有的vm作为总线对象保存到Vue的原型对象上
							(2)	需要传值/数据的组件: 得到总线对象, 调用其$emit()分发事件, 携带数据
							(3)	需要接收消息/数据的组件: 
									①	在mounted()中: 得到总线对象, 调用其$on()绑定监听, 接收数据
									②	在beforeDestroy()中: 得到总线对象, 调用其$off()解绑监听
