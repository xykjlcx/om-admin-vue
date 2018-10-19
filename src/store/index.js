import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import action from './action'
import app from './app'
import getters from './getters'

Vue.use(Vuex)

const state = {
  login: false, // 是否登录
  userInfo: null // 用户信息
}

export default new Vuex.Store({
    modules: {
        app
    },
    state,
    action,
    mutations,
    getters
})
