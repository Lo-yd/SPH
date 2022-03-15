import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import './assets/css/reset.css'
import store from '@/store'
import "@/mock/mockServe";

Vue.config.productionTip = false
//全局组件注册
Vue.component(TypeNav.name, TypeNav)

// import { getCategoryList } from "@/api"

// getCategoryList();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
