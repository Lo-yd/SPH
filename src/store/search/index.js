import { reqGetSearchInfo } from "@/api"

export default {
  // 开启名空间
  namespaced: true,
  actions: {
    async getSearchInfo({commit}, params = {}){
      let res = await reqGetSearchInfo(params);
      if (res.code === 200) {
        commit('GETSEARCHINFO',res.data);
      }
    }
  },
  mutations: {
    GETSEARCHINFO(state, searchInfo){
      state.searchInfo = searchInfo;
    }
  },
  state: {
    searchInfo: {},
  },
  getters: {
    //参数state,当前仓库的state
    goodsList(state){
      return state.searchInfo.goodsList || [];
    },
    trademarkList(state){
      return state.searchInfo.trademarkList || [];
    },
    attrsList(state){
      return state.searchInfo.attrsList || [];
    }
  }
}