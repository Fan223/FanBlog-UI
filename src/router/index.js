// 该文件专门用于创建整个应用的路由器
// 引入VueRouter
import VueRouter from 'vue-router'

// 创建 router 实例对象（路由器），去管理一组一组的路由规则，并暴露出去
export default new VueRouter({
  // 路由配置
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
    },
    {
      path: '/',
      name: 'Main',
      component: () => import('@/layout/Main.vue'),
    }
  ]
})