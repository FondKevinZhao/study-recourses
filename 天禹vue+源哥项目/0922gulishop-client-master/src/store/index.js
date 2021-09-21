import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import user from './user'
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import trade from './trade'


//vuex当中的4个核心概念  
const state = {
  //存数据
}

const mutations = {
  //直接修改数据
}

const actions = {
  //与组件当中用户对接
  //一般是异步发请求
  //提交mutations
}

const getters = {
  //后面用来简化数据的操作

}


export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  // modules代表模块化
  modules:{
    user,
    home,
    search,
    detail,
    shopcart,
    trade
  }
})

//最终暴露
// {
//   default:store
// }

