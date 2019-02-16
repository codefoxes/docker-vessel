import Vue from 'vue'
import store from './state/store'
import Home from '../components/Home.vue'

new Vue({
	store,
	el: '#app',
	render: h => h(Home)
})
