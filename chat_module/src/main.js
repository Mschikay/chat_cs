/* eslint-disable no-console */
import Vue from 'vue'
import App from './App.vue'
import './assets/bootstrap/bootstrap.min.css'
import axios from 'axios'

/* connect host (socket) */
import VueSocketIo from 'vue-socket.io';
import io from 'socket.io-client';
Vue.use(VueSocketIo, io('http://localhost:3333'));//与服务端链接

/* set axios */
axios.defaults.baseURL = "http://localhost:3333" ; //设置 ajax 请求中的基础 URL
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
	render: h => h(App)
}).$mount('#app');


