import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//重复点击路由，报错问题解决
const originPush = VueRouter.prototype.push
/**
 * push | replace 返回值是一个promise对象
 * @param {路由跳转地址} location 
 * @param {成功回调} resolve 
 * @param {失败回调} reject 
 */
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => { }, () => { })
  }
}
const originReplace = VueRouter.prototype.push
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => { }, () => { })
  }
}

const routes = [
  {
    path: '/',
    redirect: 'home'
  },
  {
    name: 'Home',
    path: '/home',
    component: () => import('@/views/Home'),
    meta: {
      show: true
    }
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/Login'),
    meta: {
      show: false
    }
  },
  {
    name: 'Register',
    path: '/register',
    component: () => import('@/views/Register'),
    meta: {
      show: false
    }
  },
  {
    name: 'Search',
    path: '/search/:keyword?',
    component: () => import('@/views/Search'),
    meta: {
      show: true
    }
  },
  {
    name: 'Detail',
    path: '/detail/:skuid',
    component: () => import('@/views/Detail'),
    meta: {
      show: true
    }
  },
]
const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router