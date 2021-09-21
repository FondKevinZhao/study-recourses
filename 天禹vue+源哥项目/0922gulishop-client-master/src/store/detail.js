//这个是detail模块的vuex模块
import {reqDetailInfo} from '@/api'
//vuex当中的4个核心概念  
const state = {
  //存数据
  detailInfo:{}
}
// state是vuex存储数据的地方，但是这个state并不是永久存储
// 当我们刷新页面或者重新启动项目（可以认为刷新页面就是重启了一下项目）
// 那么vuex当中所有的数据，都要重新初始化，重新发请求去获取
// state里面的数据一开始就是有的，只不过是我们初始化的，不是请求回来的
// 但是state这个初始化的数据，也会影响组件（组件也是可以获取这个初始化数据）

// 就是因为vue和vuex没办法去永久存储数据，才有以下两个存储方案
// localStorage
// sessionStorage

const mutations = {
  //直接修改数据
  RECEIVE_DETAILINFO(state,detailInfo){
    state.detailInfo = detailInfo
  }
}

const actions = {
  //与组件当中用户对接
  //一般是异步发请求
  //提交mutations
  async getDetailInfo({commit},skuId){
    const result = await reqDetailInfo(skuId)
    if(result.code === 200){
      commit('RECEIVE_DETAILINFO',result.data)
    }
  }
}

const getters = {
  //后面用来简化数据的操作
  categoryView(state){
    return state.detailInfo.categoryView || {}
  },
  skuInfo(state){
    //当请求的数据回来skuInfo才会是真正的对象
    //当请求的数据没回来skuInfo就是undefined
    //这里或一个{}，目的就是为了不给组件传递undefined,否则使用skuInfo.xxx就会报错
    //因此我们这里或一个{}, 即使数据没获取回来，但是我们给组件的不是undefined，保证不会出错
    return state.detailInfo.skuInfo || {}
  },
  spuSaleAttrList(state){
    return state.detailInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}