//这个是user模块的vuex模块
import {getUserTempId} from '@/utils/userabout'
import {reqGetCode, reqGetUserInfo, reqUserLogin, reqUserLogout, reqUserRegister,reqUserAddressList} from '@/api'
//vuex当中的4个核心概念  
const state = {
  //存数据
  // getUserTempId() 这个函数就是专门用来生成用户的临时标识的
  userTempId:getUserTempId(),
  code:'', //用户注册的验证码信息

  // token:'', //初始化为空串无法自动登录
  token:localStorage.getItem('TOKEN_KEY'), //自动登录先从localStorage获取，能拿到就不需要再发登录请求了，

  userInfo:{}, //根据token获取用户信息

  userAddressList:[]
}

const mutations = {
  //直接修改数据
  RECEIVE_CODE(state,code){
    state.code = code
  },

  RECEIVE_TOKEN(state,token){
    state.token = token
  },

  RECEIVE_USERINFO(state,userInfo){
    state.userInfo = userInfo
  },

  //token过期需要重新清空token
  // RESET_TOKEN(state){
  //   state.token = ''
  // },

  //退出登录需要清空用户信息及token,它可以和上面token过期并用一个
  RESET_USER(state){
    state.token = ''
    state.userInfo = {}
  },


  RECEIVE_USERADDRESSLIST(state,userAddressList){
    state.userAddressList = userAddressList
  }

}

const actions = {
  //与组件当中用户对接reset_user()
  //一般是异步发请求
  //提交mutations
  async userRegister({commit},userInfo){
    const result = await reqUserRegister(userInfo)
    if(result.code === 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('failed'))
    }
  },

  //请求获取code
  async getCode({commit},phone){
    const result = await reqGetCode(phone)
    if(result.code === 200){
      commit('RECEIVE_CODE',result.data)
      return 'ok'
    }else{
      return Promise.reject(new Error('failed'))
    }
  },

  //请求登录
  async userLogin({commit},userInfo){
    const result = await reqUserLogin(userInfo)
    if(result.code === 200){
      commit('RECEIVE_TOKEN',result.data.token)
      //自动登录就是需要保存token到localStorage
      //保证第一次登录完成，后期的登录都可以免了
      localStorage.setItem('TOKEN_KEY',result.data.token)
      return 'ok'
    }else{
      return Promise.reject(new Error('failed'))
    }
  },

  //根据token请求获取用户信息
  async getUserInfo({commit}){
    const result = await reqGetUserInfo()
    if(result.code === 200){
      commit('RECEIVE_USERINFO',result.data)
      return 'ok'
    }else{
      return Promise.reject(new Error('failed'))
    }
  },

  // 清除用户的token信息
  async clearToken({commit}){
    commit('RESET_USER')
    localStorage.removeItem('TOKEN_KEY')  //当token过期，需要把过去的token清除，不但要清除state的也要清除localStorage
  },
  
  //退出登录
  async userLogout({commit}){
    const result = await reqUserLogout()
    if(result.code === 200){
      //退出成功
      //清空数据   清空state的token  清空state的用户信息  清空localStorage的token
      commit('RESET_USER') //清空state当中的用户信息和token
      localStorage.removeItem('TOKEN_KEY') //清空localStorage的token
      return 'ok'
    }else{
      return Promise.reject(new Error('failed'))
    }
  },

  //获取用户收货地址信息
  async getUserAddressList({commit}){
    const result = await reqUserAddressList()
    if(result.code === 200){
      commit('RECEIVE_USERADDRESSLIST',result.data)
    }
  }

}

const getters = {
  //后面用来简化数据的操作

}

export default {
  state,
  mutations,
  actions,
  getters
}