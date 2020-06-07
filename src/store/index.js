// 使用cdn加速取代本地插件
// import Vue from 'vue'
// import Vuex from 'vuex'


// 1.安装插件
Vue.use(Vuex)

const state = {
  loginStatus:false
}
// 2.创建Store对象
const store = new Vuex.Store({
  state,
mutations:{
  addArticleContext(state,data){
    state.articleContext = data
    console.log(state.articleContext)
  }
}
})
// 3.挂载Vue实例上
export default store
