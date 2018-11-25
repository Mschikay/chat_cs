import Vue from 'vue'
import Router from 'vue-router'
import chat from '@/components/divChat'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	routes:[
		{
			path: '/',
			name: 'chat',
			component: chat
		}
	]
});

export default router
