import { getCategoryList, reqGetBannerList, reqGetFloorList } from "@/api"

export default {
  actions: {
    //获取菜单数据
    async getCategoryList({ commit }) {
      const res = await getCategoryList();
      if (res.code === 200) {
        commit('GETCATEGORYLIST', res.data)
      }
    },
    //获取轮播图数据
    async getBannerList({ commit }) {
      const res = await reqGetBannerList();
      if (res.code === 200) {
        commit('GETBANNERLIST', res.data)
      }

    },
    //获取floor数据
    async getFloorList({ commit }) {
      let res = await reqGetFloorList();
      if (res.code === 200) {
        commit('GETFOOLRLIST', res.data);
      }
    }
  },
  mutations: {
    GETCATEGORYLIST(state, value) {
      state.categoryList = value.slice(0, 16)
    },
    GETBANNERLIST(state, bannerList) {
      state.bannerList = bannerList;
    },
    GETFOOLRLIST(state, floorList) {
      state.floorList = floorList;
    }
  },
  state: {
    categoryList: [],
    bannerList: [],
    floorList: []
  },
  getters: {}
}