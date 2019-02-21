// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import Vuex from 'vuex' //引入状态管理
import router from './router'
import Mint from 'mint-ui'
import ElementUI from 'element-ui';
import { Toast } from 'mint-ui';
import vant from 'vant'
import store from '@/store/store'
import echarts from "echarts"
import 'vant/lib/index.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'mint-ui/lib/style.css'
import 'lib-flexible/flexible.js'
import '@/CSS/common.css'
import qs from 'qs';

Vue.prototype.$axios = axios;// 将axios挂载到prototype上，在组件中可以直接使用this.axios访问
Vue.prototype.$qs = qs;
Vue.use(Mint);
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(echarts);
Vue.use(vant)
Vue.config.productionTip = false
/* axios.interceptors.request.use(config => {
    if (localStorage.hasOwnProperty('token')) { */
/* config.headers.Authorization = `access_token ${localStorage.token.access_token}` */
/*  config.headers = { 'Content-Typ': "multipart/form-data", } */
/*    config.headers = { 'WWW - Authenticate':  `access_token ${localStorage.access_token}` } */
/*     }
    return config
}, err => {
    return Promise.reject(err)
}) */
axios.defaults.timeout = 5000;
// 添加请求拦截器
axios.interceptors.request.use(
    (config) => {
        if (localStorage.hasOwnProperty('token')) {
            //如果存在token的话，则每个http header都加上token
            config.headers.Authorization = `access_token ${JSON.parse(window.localStorage.getItem('token')).access_token}`;
            config.headers = { 'Content-Typ': "multipart/form-data", }
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    })

// 添加响应拦截器
axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                // 通过状态码判断token是否失效或者token是否错误，若是，直接返回登录页面
                case 401:
                    localStorage.clear(), //清空localStorage
                    this.$router.go(0);
                    router.push({
                        path: '/login',
                    })
                    break;
            }
        }
        return Promise.reject(error)
    })

//全局守卫，记录登录状态
router.beforeEach((to, from, next) => {
    //需求登录判断
    if (to.meta.required) {
        //未登录
        var isLogin = localStorage.getItem('token');
        if (isLogin) {
            next();//跳转到目标页面
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            });//跳转到登录页面
            Toast('请登录账号');

        }
    } else {
        next();
    }
})
export default axios
/* eslint-disable no-new */
new Vue({
    el: '#app',
    axios,
    router,
    store,
    render: h => h(App)
}).$mount('#app');


