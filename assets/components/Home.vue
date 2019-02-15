<template>
	<div id="home">
		<header>
			<h1 id="title">Docker Vessel</h1>
		</header>
		<main class="container">
			<sidebar></sidebar>
			<div class="content col-3">content</div>
		</main>
	</div>
</template>

<script>
	import Sidebar from './sidebar/Sidebar'

	export default {
		name: 'Home',

		components: {
			Sidebar
		}
	}
</script>

<style scoped>

</style>
