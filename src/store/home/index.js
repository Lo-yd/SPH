import {getCategoryList,reqGetBannerList} from "@/api"


const actions = {
  //获取菜单数据
  async getCategoryList({commit}){
    const res = await getCategoryList();
    if (res.code === 200) {
      commit('GETCATEGORYLIST',res.data)
    }
  },
  //获取轮播图数据
  async getBannerList({commit}){
    const res = await reqGetBannerList();
    if (res.code === 200) {
      commit('REQGETBANNERLIST',res.data)
    }
    
  }
}
const mutations = {
  GETCATEGORYLIST(state, value){
    state.categroyList = value.slice(0,16)
  },
  REQGETBANNERLIST(state, bannerList){
    state.bannerList = bannerList;
  }
}
const state = {
  categroyList: [],
  bannerList: [],
}
const getters = {}
export default {actions,mutations,state,getters}