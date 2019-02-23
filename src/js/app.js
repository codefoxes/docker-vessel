import Vue from 'vue'
import store from './state/store'
import Home from '../components/Home.vue'

import plugins from './plugins'

plugins.loadFor('home').init('test')

new Vue({
	store,
	el: '#app',
	render: h => h(Home)
})
