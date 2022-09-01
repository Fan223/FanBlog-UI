import axios from "axios";
import ElementUI from "element-ui";
import router from "./router";
import store from './store'

const request = axios.create({
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
    },
});

request.interceptors.request.use(config => {
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
        // 请求头带上 token
        config.headers.Authorization = userInfo.jwt;
        // 带上用户名
        config.headers.username = userInfo.username
    }
    return config;
});

request.interceptors.response.use(response => {
    let res = response.data;

    if (res.code === 200) {
        return response;
    } else {
        ElementUI.Message.error(res.msg ? res.msg : '系统异常');
        if (res.code === 401) {
            localStorage.clear();
            store.state.tabs = [{
                name: 'Home',
                label: '首页',
            }]
            router.push("/login");
        }
        return Promise.reject(res.msg);
    }
}, error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                router.push("/login");
                ElementUI.Message.error("请重新登录！")
                break;
            case 403:
                ElementUI.Message.error("拒绝访问");
                break;
            case 404:
                ElementUI.Message.error("请求错误,未找到该资源");
                break;
            case 500:
                ElementUI.Message.error("服务器出错");
                break;
            default:
                ElementUI.Message.error("未知错误");
        }
    }
    return Promise.reject(error);
});

export default request
