//引入Vue
import Vue from 'vue'

//引入Vuex
import Vuex from 'vuex'

//应用插件
Vue.use(Vuex)

//初始化状态,要写成一个对象，包含n组key-value，因为该state要管理n多个组件的状态
const state = {
	sum:0
}

//创建一个actions，值为一个对象，包含：n个响应组件“动作”的函数
const actions = {
	//context是一个迷你版的$store,我要用context.commit()去通知mutations加工状态
	jia(context,value){ 
		context.commit('JIA',value)
	},
	jian(context,value){ 
		context.commit('JIAN',value)
	},
	jiaOdd(context,value){ 
		if(context.state.sum % 2){
			context.commit('JIA',value)
		}
	},
	jiaAsync(context,value){ 
		setTimeout(()=>{
			context.commit('JIA',value)
		},500)
	},
}

//创建一个mutations，值为一个对象，包含：n个真正用于加工状态的函数
const mutations = {
	JIA(state,value){
		state.sum += value
	},
	JIAN(state,value){
		state.sum -= value
	}
}

//创建store，用于管理：state对象、actions对象、mutations对象
const store = new Vuex.Store({
	state,
	actions,
	mutations
})

//暴露store
export default store
