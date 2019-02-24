<template>
	<div id="home">
		<header class="topbar">
			<h1 id="title">Docker Vessel</h1>
		</header>
		<main class="main">
			<sidebar></sidebar>
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
			addingService: false,
			editingProject: false
		}
	},

	beforeCreate () {
		this.$store.dispatch('config/loadConfig')
	},

	methods: {}
}
</script>
