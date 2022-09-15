import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import router from './taorouter'
// import store from './store'
import store from './taostore'

new Vue({
  // 注册后全局使用
  router,
  store,
  render: h => h(App)
}).$mount('#app')
