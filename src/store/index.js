import Vue from "vue"
import Vuex from "vuex"
//导入模块
import home from "@/store/home"
import search from "@/store/search"
import detail from "@/store/modules/detail"
Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    home,
    search,
    detail
  }
})