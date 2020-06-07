// import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store'
// import axios from 'axios'

// 全局注册
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)

// import moment from 'moment'
Vue.prototype.$moment = moment

//添加事件总线供兄弟组件通信
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false
Vue.prototype.$http = axios 
new Vue({
  store,
  axios,
  router,
  render: h => h(App),

}).$mount('#app')
