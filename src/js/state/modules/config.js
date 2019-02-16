import { remote as electron } from 'electron'
import fs from 'graceful-fs'

const userPath = electron.app.getPath('userData')
const fileName = 'vessel-config.json'

// initial state
const state = {
	all: false
}

// getters
const getters = {
}

// actions
const actions = {
	loadConfig ({ state, commit }) {
		if (!state.all) {
			commit('loadConfig')
		}
	}
}

// mutations
const mutations = {
	loadConfig (state) {
		try {
			const configContent = fs.readFileSync(`${userPath}/${fileName}`, 'utf8')
			state.all = JSON.parse(configContent)
		} catch (err) {
			// Reading config failed.
		}
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
