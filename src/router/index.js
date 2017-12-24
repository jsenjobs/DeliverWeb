import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Main from '@/components/tools/main'
import Query from '@/components/tools/query'
import AddUser from '@/components/tools/adduser'

import Login from '@/components/page/login'

Vue.use(Router)
let router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/db'
    },
    {
      path: '/db',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      children: [
        {
          path: '',
          redirect: 'main'
        },
        {
          path: 'main',
          component: Main
        },
        {
          path: 'query',
          component: Query
        },
        {
          path: 'adduser',
          component: AddUser
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
import Cookies from '../utils/Cookies.js'
router.beforeEach((to, from, next) => {
  // alert(sessionStorage.getItem('accessToken'))
  //    console.log(to);
  if (to.path === '/login') {
    // 如果已经登入转到主页
    if (Cookies.getCookie('usession')) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else if (!Cookies.getCookie('usession')) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})
export default router
