import { reqGetSearchInfo } from "@/api"

export default {
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
  getters: {}
}