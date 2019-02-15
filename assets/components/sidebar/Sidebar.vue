<template>
	<div class="sidebar">
		<ul class="list">
			<li><button @click="addService">Add Service</button></li>
			<li><button @click="send">Site 1</button></li>
			<li><button @click="send">Site 2</button></li>
		</ul>
	</div>
</template>

<script>
	import { ipcRenderer as ipc } from 'electron'

	export default {
		name: 'Sidebar',

		methods: {
			addService() {
				ipc.send('add-service')
			},
			send() {
				ipc.send('open-create-window')
			}
		}
	}
</script>

<style scoped>

</style>
