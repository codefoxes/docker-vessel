import { remote as electron, ipcRenderer as ipc } from 'electron'
import fs from 'graceful-fs'

import plugins from './plugins'

const userPath = electron.app.getPath('userData')
const fileName = 'vessel-config.json'
let config = { projects: [] }

try {
	const configContent = fs.readFileSync(`${userPath}/${fileName}`, 'utf8')
	config = JSON.parse(configContent)
} catch (err) {
	// Reading config failed.
}

plugins.loadFor('addProject').init('test')

console.log(userPath)

document.getElementById('save').addEventListener('click', () => {
	const projectName = document.getElementById('name')

	// Todo: If config is empty, Try reading once again?
	config.projects.push({
		name: projectName.value
	})

	try {
		fs.writeFileSync(`${userPath}/${fileName}`, JSON.stringify(config, null, '\t'), 'utf8')
		ipc.send('reload-window')
		window.close()
	} catch (err) {
		if (err.code === 'EACCES') {
			err.message = `${err.message}\nYou don't have access to this file.\n`
		}
		throw err
	}
})
