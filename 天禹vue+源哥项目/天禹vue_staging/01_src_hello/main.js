import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false //关闭生产提示

/* 
	vue.runtime.common.js和vue.js有何区别？
			vue.runtime.common.js（项目中用的多） : 
					1.不包含模板解析器，打包后体积小
					2.配置项中的不能写template，要用render: h => h(App)代替
			vue.js : 
					1.包含解模板析器，打包后体积大
					2.配置可以写template
*/

new Vue({
	el:'#app',

	render: h => h(App),
	
	// components:{App},
	// template:`<App/>`
})
