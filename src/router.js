import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/shopMall.vue'
import Reginst from 'views/reginst.vue'
import Login from 'views/login.vue'
import GoodInfo from 'views/good.vue'
import CategoryList from 'views/CategoryList.vue'
import ShopCart from 'views/shopCart.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/reginst',
      name: 'reginst',
      component: Reginst
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path:'/goodInfo/',
      name:'goodInfo',
      component:GoodInfo
    },
    {
      path:'/categoryList',
      name:'categoryList',
      component:CategoryList
    },
    {
      path:'/shopCart',
      name:'shopCart',
      component:ShopCart
    }
  ]
})
