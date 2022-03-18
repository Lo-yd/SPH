import { reqGetSearchInfo } from "@/api"

const actions = {
  async getSearchInfo({commit}, params = {}){
    let res = await reqGetSearchInfo(params);
    if (res.code === 200) {
      commit('GETSEARCHINFO',res.data);
    }
  }
}
const mutations = {
  GETSEARCHINFO(state, searchInfo){
    state.searchInfo = searchInfo;
  }
}
const state = {
  searchInfo: {},
}
const getters = {}
export default {actions,mutations,state,getters}