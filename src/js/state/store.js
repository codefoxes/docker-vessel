import Vue from 'vue'
import Vuex from 'vuex'
import config from './modules/config'
import project from './modules/project'
import content from './modules/content'
import compose from './modules/compose'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		config,
		project,
		content,
		compose
	}
})

export default store
