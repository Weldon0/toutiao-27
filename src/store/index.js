import Vue from 'vue'
import Vuex from 'vuex'
import { TOKENKEY } from '@/constants'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem(TOKENKEY))
  },
  mutations: {
    setUser (state, payload) {
      // 存入本地存储
      localStorage.setItem(TOKENKEY, JSON.stringify(payload))
      // 存入vuex
      state.user = payload
    }
  },
  actions: {},
  modules: {}
})
