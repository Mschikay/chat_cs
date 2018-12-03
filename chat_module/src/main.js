/* eslint-disable no-console */
import Vue from 'vue'
import App from './App.vue'
import './assets/bootstrap/bootstrap.min.css'
import axios from 'axios'
import Router from 'vue-router'
import divChat from './components/divChat'
import VueSocketIo from 'vue-socket.io';
import io from 'socket.io-client';

/***	Connect to server	***/
Vue.use(VueSocketIo, io('http://localhost:3333', {
	'reconnection': true,
	'reconnectionDelay': 1000,
	'reconnectionDelayMax' : 5000,
	'reconnectionAttempts': 5000000000000000000000000
}));


/***	set axios	***/
axios.defaults.baseURL = "http://localhost:3333" ;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;


/***	set router	***/
Vue.use(Router)
const router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/:email',
			component: divChat,
		}
	]
});


new Vue({
	router,
	render: h => h(App)
}).$mount('#app');


