import { reqTradeInfo } from "@/api"

//vuex当中的4个核心概念  
const state = {
  tradeInfo:{}
}

const mutations = {
  RECEIVE_TRADEINFO(state,tradeInfo){
    state.tradeInfo = tradeInfo
  }
}

const actions = {
  async getTradeInfo({commit}){
    const result = await reqTradeInfo()
    if(result.code === 200){
      commit('RECEIVE_TRADEINFO',result.data)
    }
  }
}

const getters = {
  detailArrayList(state){
    return state.tradeInfo.detailArrayList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}