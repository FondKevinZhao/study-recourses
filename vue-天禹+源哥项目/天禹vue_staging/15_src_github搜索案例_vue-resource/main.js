import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'

Vue.config.productionTip = false //关闭生产提示
Vue.use(VueResource)

const vm = new Vue({
	beforeCreate() {
		Vue.prototype.$bus = this //安装全局事件总线
	},
	el:'#app',
	render:h => h(App)
})
console.log('vm',vm)