import Vue from 'vue'
import Vant from 'vant'
import 'amfe-flexible'
import 'vant/lib/index.css'
import App from './App.vue'
import router from './router'
import '@/styles/index.less'
import '@/styles/font/iconfont.css'
import store from './store'
import '@/utils/day'

Vue.use(Vant)

// state
// mutatios
// actions
// getters
// module
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
