//这个是shopcart模块的vuex模块

import { reqAddOrUpdateShopCart,reqshopCartInfo, reqUpdateCartIscheck,reqDeleteShopCart } from "@/api"

//vuex当中的4个核心概念  
const state = {
  //存数据
  shopCartInfo:[]
}

const mutations = {
  //直接修改数据
  RECEIVE_SHOPCARTINFO(state,shopCartInfo){
    state.shopCartInfo = shopCartInfo
  }
}

const actions = {
  //与组件当中用户对接
  //一般是异步发请求
  //提交mutations

  // async 函数称作异步函数，一般内部都是有异步操作的
  // async 函数返回值，一定是promise对象，不看return 
  // 返回的promise对象的成功和失败及结果，要看return
  // return的结果如果是非promise对象 那么promise一定是成功的，成功的结果就是return的结果
  // return的结果如果是promise对象，那么要看这个return后面的promise对象是成功的还是失败的
          //如果return的promise对象是成功的，那么promise对象就是成功的，成功的结果就是return的promise的成功结果
          //如果return的promise对象是失败的，那么promise对象就是失败的，失败的原因就是return的promise的失败原因

  // 如果没有return结果而是抛出错误，promise也是失败的，原因就是抛出的错误原因

  async addOrUpdateShopCart({commit},{skuId,skuNum}){
    const result = await reqAddOrUpdateShopCart(skuId,skuNum)
    // 这个写法，async函数返回的promise将永远成功，不合常理
    // 但是对于我们写代码可行
    // if(result.code === 200){
    //   return 'ok'
    // }else{
    //   return 'failed'
    // }
    if(result.code === 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('failed'))
    }
  },

  async getshopCartInfo({commit}){
    const result = await reqshopCartInfo()
    if(result.code === 200){
      commit('RECEIVE_SHOPCARTINFO',result.data)
    }
  },


  //修改购物车选中
  async updateCartIscheck({commit},{skuId,isChecked}){
    const result = await reqUpdateCartIscheck(skuId,isChecked)
    if(result.code === 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('failed'))
    }
  },


  //async await 相关  
  //promise基础用法  
      // then和catch  链式调用（中断）
  //Promise.reject()
  //Promise.resolve()
  //Promise.race()
  //Promise.all()





  //使用Promise.all，采用单个修改的接口去修改多个，但是真正不是这样做的
  //真正就应该有一个修改多个的接口
  //Promise.all() 是promise的一个api 
  //功能:   批量处理多个promise对象
  //参数:   promise对象的数组
  //返回值：返回一个新的promise对象

  //新的promise对象是成功还是失败 
  //只有所有的promise都成功才成功 只要有一个失败了就直接失败
  //新的promise对象成功的结果：是参数promise对象数组当中每个promise对象成功的结果组成的数组
  //新的promise对象失败的结果：是参数promise对象数组当中第一个失败的promise对象失败的原因


  //没有添加async  updateCartIscheckAll返回的是Promise.all(promises)返回的新promise
  //添加了async updateCartIscheckAll返回的是异步函数返回的promise
  //虽然添加不添加async 返回不是同一个promise，但是最终结果是一样
  //原因是，async函数返回的promise，最终成功和失败看的是return的Promise.all(promises)返回的promise

  async updateCartIscheckAll({commit,getters,dispatch},isChecked){
    let promises = []
    // getters.cartInfo.cartInfoList  获取到的就是我们的购物车列表数据
    getters.cartInfo.cartInfoList.forEach(item => {
      if(item.isChecked === isChecked) return   //如果发现其中的每个购物车数据已经和要改变的状态一样，那就不用请求改变了
      //拿一个数据提交给上面修改单个的接口去处理
      //也就是说本质还是通过修改单个的去修改多个的，只是采用了Promise.all一次处理
      let promise = dispatch('updateCartIscheck',{skuId:item.skuId,isChecked})
      promises.push(promise)
    })
    return Promise.all(promises)
  },

  //删除单个
  async deleteShopCart({commit},skuId){
    const result = await reqDeleteShopCart(skuId)
    if(result.code === 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('failed'))
    }
  },

  //删除多个
  deleteShopCartAll({commit,getters,dispatch}){
    let promises = []
    getters.cartInfo.cartInfoList.forEach(item => {
      if(!item.isChecked) return 
      let promise = dispatch('deleteShopCart',item.skuId)
      promises.push(promise)
    })
    return Promise.all(promises)
  }

}

const getters = {
  //后面用来简化数据的操作
  cartInfo(state){
    // 这个数据拿到的是我们的购物车列表对象，还不是我们要的数据，我们要的数据再这个对象里面
    return state.shopCartInfo[0] || {}
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}