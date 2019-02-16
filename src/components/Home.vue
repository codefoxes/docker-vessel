<template>
	<div id="home">
		<header>
			<h1 id="title">Docker Vessel</h1>
		</header>
		<main class="main">
			<sidebar v-on:addService="addService"></sidebar>
			<main-content></main-content>
		</main>
	</div>
</template>

<script>
import Sidebar from './sidebar/Sidebar.vue'
import MainContent from './content/MainContent.vue'

export default {
	name: 'Home',

	components: {
		Sidebar,
		MainContent
	},

	data () {
		return {
			projectName: '',
			addingService: false
		}
	},

	beforeCreate () {
		this.$store.dispatch('config/loadConfig')
	},

	methods: {
		addService (projectName) {
			this.addingService = true
			this.projectName = projectName
		}
	}
}
</script>
