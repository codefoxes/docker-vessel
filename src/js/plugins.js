import { statSync, readdirSync, readFileSync } from 'graceful-fs'
import { join, resolve } from 'path'
import requireJs from 'requirejs'

const pluginPath = resolve('./plugins')
const dirs = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory())
const allPlugins = dirs(pluginPath)
const modules = []

requireJs.config({
	baseUrl: pluginPath
})

const plugins = {
	loadFor: (page) => {
		allPlugins.forEach((pluginName) => {
			let manifest = { loaders: {} }
			try {
				const configContent = readFileSync(`${pluginPath}/${pluginName}/manifest.json`, 'utf8')
				manifest = JSON.parse(configContent)
			} catch (err) {
				// Reading config failed.
			}

			if ('loaders' in manifest && page in manifest.loaders) {
				modules.push(requireJs(`${pluginName}/${manifest.loaders[page]}`))
			}
		})
		return plugins
	},

	init: (...args) => {
		modules.forEach((singleModule) => {
			singleModule.init(...args)
		})
	}
}

export default plugins
