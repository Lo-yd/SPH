import Vue from 'vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//重复点击路由，报错问题解决
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const routes = [
  {
    path: '/',
    redirect: 'home'
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/views/Home'),
    meta: {
      show: true
    }
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login'),
    meta: {
      show: false
    }
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('@/views/Register'),
    meta: {
      show: false
    }
  },
  {
    name: 'search',
    path: '/search/:keyword',
    component: () => import('@/views/Search'),
    meta: {
      show: true
    }
  },
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
export default router