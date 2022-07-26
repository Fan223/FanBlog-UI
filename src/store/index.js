// 该文件用于创建 Vuex 中最为核心的 store

// 引入 Vue
import Vue from 'vue'
// 引入 Vuex
import Vuex from 'vuex'
// 应用 Vuex 插件
Vue.use(Vuex)

// 准备 actions——用于响应组件中的动作
const actions = {}
// 准备 mutations——用于操作数据（state）
const mutations = {}
// 准备state——用于存储数据
const state = {}
// 准备getters——用于将state中的数据进行加工
const getters = {}

//创建并暴露 store
export default new Vuex.Store({
  //actions: actions,
  actions,
  mutations,
  state,
  getters
})
