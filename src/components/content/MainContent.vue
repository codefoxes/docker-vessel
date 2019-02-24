<template>
	<section class="content">
		<div v-if="currentState === 'addService'" class="add-service grid cols-2">
			<input class="col-2" type="text" placeholder="Search Images">
			<div class="images-list col-2 grid cols-2 gap-1">
				<div class="image"
					v-for="image in images"
					:key="image.name"
					@click="selectImage(image.name)">
					{{ image.title }}
				</div>
			</div>
		</div>
		<div v-if="currentState === 'editProject'" class="edit-project">
			<header>
				<button @click="saveProject">Save</button>
			</header>
			<codemirror
				v-model="code"
				:options="editorOptions">
			</codemirror>
		</div>
	</section>
</template>

<script>
import { codemirror } from 'vue-codemirror'

export default {
	name: 'MainContent',

	components: {
		codemirror
	},

	mounted () {
		// this.projects = this.$store.state.config.all.projects
	},

	data () {
		return {
			editorOptions: {
				tabSize: 4,
				mode: 'text/x-yaml',
				theme: 'base16-light',
				lineNumbers: true,
				line: true,
				smartIndent: true
			},
			images: [
				{
					title: 'Ubuntu',
					name: 'ubuntu'
				},
				{
					title: 'Alpine',
					name: 'alpine'
				},
				{
					title: 'MySQL',
					name: 'mysql'
				},
				{
					title: 'Adminer',
					name: 'adminer'
				}
			]
		}
	},

	computed: {
		currentState () {
			return this.$store.state.content.current
		},

		code: {
			get () { return this.$store.state.compose.data },
			set (c) { this.$store.dispatch('compose/setData', c) }
		}
	},

	methods: {
		getConfig () {
			console.log(this.$store.state)
		},

		selectImage (image) {
			const service = {}
			service[image] = {
				container_name: image,
				image
			}
			this.$store.dispatch('compose/addService', service)
			// Todo: Why manually update? (2 way binding from state didn't work)
			this.code = this.$store.state.compose.data
		},

		saveProject () {
			this.$store.dispatch('compose/saveCompose')
		}
	}
}
</script>
