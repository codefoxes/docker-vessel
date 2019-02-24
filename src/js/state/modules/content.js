// initial state
const state = {
	current: 'dashboard'
}

// getters
const getters = {
}

// actions
const actions = {
	changeState ({ state, commit }, currentState) {
		commit('changeState', { currentState })
	}
}

// mutations
const mutations = {
	changeState (state, { currentState }) {
		state.current = currentState
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
