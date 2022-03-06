import {getCategoryList} from "@/api"
const actions = {
  async getCategoryList({commit}){
    const res = await getCategoryList();
    if (res.code === 200) {
      commit('GETCATEGORYLIST',res.data)
    }
  }
}
const mutations = {
  GETCATEGORYLIST(state, value){
    state.categroyList = value.slice(0,16)
  }
}
const state = {
  categroyList: [],
}
const getters = {}
export default {actions,mutations,state,getters}