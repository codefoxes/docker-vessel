<template>
	<div class="sidebar">
		<ul class="list">
			<li @click="addProject">Add Project</li>
			<li v-for="project in projects" :key="project.name" @click="selectProject( project.name )">{{ project.name }}</li>
			<li @click="send">Default</li>
		</ul>
		<ul class="list" v-if="currentProject !== ''">
			<li @click="addService">Add Service</li>
		</ul>
	</div>
</template>

<script>
import { remote as electron, ipcRenderer as ipc } from 'electron'
import fs from 'graceful-fs'

const userPath = electron.app.getPath('userData')
const fileName = 'vessel-config.json'

export default {
	name: 'Sidebar',

	data () {
		return {
			projects: [],
			currentProject: ''
		}
	},

	created () {
		try {
			const configContent = fs.readFileSync(`${userPath}/${fileName}`, 'utf8')
			this.projects = JSON.parse(configContent).projects
		} catch (err) {
			// Reading config failed.
		}
	},

	methods: {
		addProject () {
			ipc.send('add-project')
		},

		addService () {
			this.$emit('addService', this.currentProject)
		},

		send () {
			ipc.send('open-app')
		},

		selectProject (projectName) {
			this.currentProject = projectName
		}
	}
}
</script>
