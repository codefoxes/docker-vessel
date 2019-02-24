<template>
	<section class="content">
		<div v-if="currentState === 'addService'" class="add-service">
			<header>
				<input class="col-2" type="text" placeholder="Search Images"
					v-model="input"
					@input="searchImage">
			</header>
			<div v-if="showDefault" class="images-list col-2 grid cols-2 gap-1">
				<div class="image"
					v-for="image in defaultImages"
					:key="image.name"
					@click="selectImage(image.name)">
					{{ image.title }}
				</div>
			</div>
			<div v-if="!showDefault" class="images-list col-2 grid cols-2 gap-1">
				<div class="image"
					v-for="image in images"
					:key="image.slug"
					@click="selectImage(image.slug)">
					{{ image.name }}
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
import axios from 'axios'
import { debounce } from '../../js/lib/helpers'

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
			defaultImages: [
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
			],
			images: [],
			input: '',
			showDefault: true
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
		},

		searchImage () {
			const search = debounce(() => {
				if (this.input === '') {
					this.showDefault = true
					return
				}

				const url = `https://hub.docker.com/api/content/v1/products/search?` +
					`image_filter=store%2Cofficial&q=${this.input}&page=1&page_size=10`
				// const url = `https://hub.docker.com/api/content/v1/products/search?` +
				// `source=community&q=${this.input}&page=1&page_size=4`
				axios.get(url)
					.then((response) => {
						this.showDefault = false
						this.images = response.data.summaries.filter(img => img.type === 'image')
					})
					.catch((error) => {
						console.log(error)
					})
			}, 1000)

			search()
		}
	}
}
</script>
