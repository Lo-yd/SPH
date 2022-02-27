import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import './assets/css/reset.css'

Vue.config.productionTip = false
//全局组件注册
Vue.component(TypeNav.name, TypeNav)



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
