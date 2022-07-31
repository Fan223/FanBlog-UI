// 引入 Vue
import Vue from 'vue'
// 引入 App 组件
import App from './App.vue'
// 引入 store，假如 store 文件夹下为 index.vue，则默认会去找，可以不写
// import store from './store/index'
import store from './store'
// 引入 VueRouter
import VueRouter from 'vue-router'
// 引入路由器
import router from './router/index.js'
// 引入 Element UI 组件库
import ElementUI from 'element-ui';
// 引入 Element UI 全部样式
import 'element-ui/lib/theme-chalk/index.css';
// 引入 src/axios.js 请求拦截器
import request from './axios'

Vue.config.productionTip = false
// 全局应用 axios 请求拦截器
Vue.prototype.$axios = request
// 应用 VueRouter 插件
Vue.use(VueRouter)
// 应用 Element UI
Vue.use(ElementUI);

new Vue({
    store,
    router,
    render: h => h(App),
    beforeCreate() {
        // 安装全局事件总线，$bus就是当前应用的vm
        Vue.prototype.$bus = this
    }
}).$mount('#app')
