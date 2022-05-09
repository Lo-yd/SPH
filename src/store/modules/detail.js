import { reqGoodsInfo } from '@/api'
export default {
  namespaced: true,
  actions: {
    //获取商品详情信息
    async getGoodsInfo (context, params) {
      const { commit } = context
      const res = await reqGoodsInfo(params.skuid)
      if (res.code === 200) {
        commit('GETGOODSINFO', res.data)
      }
    }
  },
  mutations: {
    GETGOODSINFO (state, goodsInfo) {
      state.goodsInfo = goodsInfo
    }
  },
  state: {
    goodsInfo: {}
  },
  getters: {},
}