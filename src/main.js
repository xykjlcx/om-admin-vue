import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import {checkLogin} from '@/api/index'
import {setStore,getStore} from '@/store/storage'

import '@/icons' // icon

// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts 



Vue.use(ElementUI, { locale })

Vue.config.productionTip = false




router.beforeEach((to, from, next) => {

  var params = {
    token: getStore('token')
  };

  const whiteList = ['/login']

  console.log("jass：" + "开始请求")
  checkLogin(params).then(res => {
    // 尚未登录
    console.log("jass：" + "开始判断" + res.code)
    if (res.code != 0) {
      console.log("jass：" + "未登录")
      if (whiteList.indexOf(to.path) !== -1) {
        console.log('符合白名单')
        next()
      } else {
        console.log('被拦截')
        next('/login')
      }
    } else {
      console.log("jass：" + "已登录")
      // 已登录
      // store.commit('RECORD_USERINFO', {
      //   info: res.data
      // })
      setStore('isLogin',res.code)
      if (to.fullPath === '/login') {
        console.log("jass：" + "已登录 => login page")
        next('/home')
      }
      next()
    }
  })
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})