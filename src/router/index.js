// 该文件专门用于创建整个应用的路由器
// 引入VueRouter
import VueRouter from 'vue-router'
// 引入 Axios
import axios from '../axios'
// 引入 Vuex
import store from '../store'

// 创建 router 实例对象（路由器），去管理一组一组的路由规则，并暴露出去
const router = new VueRouter({
    // 路由配置
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/Login.vue'),
        },
        {
            path: '/blog/add',
            name: 'AddBlog',
            component: () => import('@/views/blog/BlogAdd.vue'),
        },
        {
            path: '/',
            name: 'Main',
            component: () => import('@/layout/Main.vue'),
            redirect: '/home',
            children: [
                {
                    path: '/home',
                    name: '首页',
                    component: () => import('@/views/Home.vue'),
                },
                {
                    path: '/blog/preview',
                    name: 'Preview',
                    component: () => import('@/views/blog/Preview.vue'),
                }
            ]
        },
    ]
})

router.beforeEach((to, from, next) => {
    let hasRoute = store.state.hasRoute

    if (!hasRoute) {
        axios.get('/fanBlog/menu/queryAllMenu').then(res => {
            if (res.data.code === 200) {
                // store.commit('SET_MENU_LIST', res.data.data)
                store.state.menuList = res.data.data
                store.state.hasRoute = true;

                // 动态绑定路由
                res.data.data.forEach(menu => {
                    if (menu.children) {
                        // 如果有子菜单，则动态绑定子菜单的路由
                        menu.children.forEach(child => {
                            let route = menuToRouter(child);
                            if (route) {
                                if (router.getRoutes().findIndex(item => item.name === route.name) === -1) {
                                    router.addRoute("Main", route);
                                }
                            }
                        })
                    } else {
                        // 没有子菜单，直接动态绑定路由
                        let route = menuToRouter(menu);
                        if (route) {
                            if (router.getRoutes().findIndex(item => item.name === route.name) === -1) {
                                router.addRoute("Main", route);
                            }
                        }
                    }
                })
                next(to.path)
            }
        })
    } else {
        next()
    }
})

const menuToRouter = menu => {
    if (!menu.component) {
        return null;
    } else {
        return {
            path: menu.path,
            name: menu.menuName,
            component: () => import(`@/views/` + menu.component + '.vue'),
            meta: {
                icon: menu.icon,
            }
        }
    }
}

export default router
