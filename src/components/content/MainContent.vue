<template>
	<div class="content grid cols-2">
		<input class="col-2" type="text" placeholder="Search Images">
		<div class="images-list col-2 grid cols-2 gap-1">
			<div class="image" @click="selectImage('ubuntu')">
				Ubuntu
			</div>
			<div class="image">
				Alpine
			</div>
			<div class="image">
				Mysql
			</div>
			<div class="image">
				Adminer
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MainContent',

	mounted () {
		this.projects = this.$store.state.config.all.projects
	},

	methods: {
		getConfig () {
			console.log(this.$store.state)
		},

		selectImage (image) {
			console.log(`Image selected ${image}`)
		}
	}
}
</script>
