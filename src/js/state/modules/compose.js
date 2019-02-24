import { remote as electron } from 'electron'
import fs from 'graceful-fs'
import yaml from 'js-yaml'

const userPath = electron.app.getPath('userData')
const fileName = 'docker-compose.yml'

function getComposeYaml (data) {
	let composeData = yaml.safeLoad(data)
	if (composeData === undefined ||
		!('services' in composeData) ||
		('services' in composeData && composeData.services === null)) {
		composeData = {
			version: '3',
			services: {}
		}
	}
	return composeData
}

function saveComposeFile (project, data) {
	const folderName = `${userPath}/projects/${project}`

	// Todo: Create directory Recursively
	if (!fs.existsSync(`${userPath}/projects`)) {
		fs.mkdirSync(`${userPath}/projects`)
	}

	if (!fs.existsSync(folderName)) {
		fs.mkdirSync(folderName)
	}

	try {
		const filePath = `${folderName}/${fileName}`
		fs.writeFileSync(filePath, data)
	} catch (err) {
		if (err.code === 'EACCES') {
			err.message = `${err.message}\nYou don't have access to this file.\n`
		}
		throw err
	}
}

function loadComposeFile (project) {
	const folderName = `${userPath}/projects/${project}`
	let composeData = 'version: \'3\'\nservices:\n\t'

	try {
		const filePath = `${folderName}/${fileName}`
		composeData = fs.readFileSync(filePath, 'utf8')
	} catch (err) {
		// Do nothing
	}

	return composeData
}

// initial state
const state = {
	currentProject: '',
	data: '',
	services: []
}

// getters
const getters = {
}

// actions
const actions = {
	setData ({ state, commit }, composeData) {
		commit('setData', { composeData })
	},

	setServices ({ commit }) {
		const composeYaml = getComposeYaml(state.data)

		const services = []
		Object.keys(composeYaml.services).forEach((key) => {
			services.push({
				name: key,
				definition: composeYaml.services[key]
			})
		})
		commit('setServices', { services })
	},

	setProject ({ commit, dispatch }, currentProject) {
		commit('setProject', { currentProject })
		const composeData = loadComposeFile(state.currentProject)
		commit('setData', { composeData })
		dispatch('setServices')
	},

	addService ({ state, commit, dispatch }, service) {
		const composeYaml = getComposeYaml(state.data)
		const serviceName = Object.keys(service)[0]
		composeYaml.services[serviceName] = service[serviceName]
		const composeData = yaml.safeDump(composeYaml)

		commit('setData', { composeData })
		dispatch('setServices')
		saveComposeFile(state.currentProject, state.data)
	},

	saveCompose ({ state, dispatch }) {
		// Todo: Validate or just save, give error if not valid?

		dispatch('setServices')

		saveComposeFile(state.currentProject, state.data)
	}
}

// mutations
const mutations = {
	setProject (state, { currentProject }) {
		state.currentProject = currentProject
	},

	setData (state, { composeData }) {
		state.data = composeData
	},

	setServices (state, { services }) {
		state.services = services
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
