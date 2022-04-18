import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import './assets/css/reset.css'
import store from '@/store'
import "@/mock/mockServe"

// element按需引入封装
import element from '@/element'
// 使用
Vue.use(element)

//全局组件TypeNav
import TypeNav from '@/components/TypeNav'

Vue.config.productionTip = false
//全局组件注册
Vue.component(TypeNav.name, TypeNav)

// import { getCategoryList } from "@/api"

// getCategoryList();

new Vue({
  router,
  store,
  beforeCreate () {
    //全局事件总线
    Vue.prototype.$bus = this
  },
  render: h => h(App),
}).$mount('#app')
