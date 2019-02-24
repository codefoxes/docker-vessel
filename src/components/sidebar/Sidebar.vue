<template>
	<aside class="sidebar">
		<ul class="list">
			<li @click="addProject">Add Project</li>
			<li v-for="project in projects" :key="project.name" @click="selectProject( project.name )">{{ project.name }}</li>
			<li @click="send">Default</li>
		</ul>
		<ul class="list" v-if="currentProject !== ''">
			<li @click="editProject">Edit Project</li>
			<li @click="addService">Add Service</li>
			<li v-for="service in services">{{ service.name }}</li>
		</ul>
	</aside>
</template>

<script>
import { ipcRenderer as ipc } from 'electron'

export default {
	name: 'Sidebar',

	data () {
		return {
			projects: [],
			currentProject: ''
		}
	},

	computed: {
		services () {
			return this.$store.state.compose.services
		}
	},

	created () {
		this.projects = this.$store.getters['config/getConfig']('projects')
	},

	methods: {
		addProject () {
			ipc.send('add-project')
		},

		addService () {
			this.$store.dispatch('content/changeState', 'addService')
		},

		editProject () {
			this.$store.dispatch('content/changeState', 'editProject')
		},

		send () {
			ipc.send('open-app')
		},

		selectProject (projectName) {
			this.$store.dispatch('project/changeProject', projectName)
			this.currentProject = projectName
		}
	}
}
</script>
