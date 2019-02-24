// initial state
const state = {
	current: ''
}

// actions
const actions = {
	changeProject ({ commit, dispatch }, currentProject) {
		dispatch('compose/setProject', currentProject, { root: true })
		commit('changeProject', { currentProject })
	}
}

// mutations
const mutations = {
	changeProject (state, { currentProject }) {
		state.current = currentProject
	}
}

export default {
	namespaced: true,
	state,
	actions,
	mutations
}
