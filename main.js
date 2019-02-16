const { app, BrowserWindow, ipcMain } = require('electron')
const { exec } = require('child_process')

// Keep global reference to window object, else window will close when garbage collected
let mainWindow
const subWindows = {}

function createMainWindow () {
	console.log('Creating window')
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 1000,
		height: 700,
		webPreferences: {
			nodeIntegration: true
		},
		// transparent:true,
		frame: false
	})

	mainWindow.loadFile('dist/index.html')

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()

	mainWindow.on('closed', () => {
		mainWindow = null
	})
}

function createWindow (name, file, options) {
	if (!subWindows[name]) {
		subWindows[name] = new BrowserWindow(options)
		subWindows[name].on('closed', () => { subWindows[name] = null })
		subWindows[name].loadFile(`${file}`)
		subWindows[name].setMenu(null)
		// subWindows[name].checkUpdate = (open) => checkUpdate(open)
	}
}

app.on('ready', createMainWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (mainWindow === null) {
		createMainWindow()
	}
})

ipcMain.on('reload-window', () => mainWindow.reload())

ipcMain.on('add-project', (event) => {
	createWindow('asWin', 'dist/add-project.html', { parent: mainWindow, width: 600, height: 320 })
})

ipcMain.on('open-app', (event) => {
	exec('open /Applications/Calculator.app', (err, stdout, stderr) => {
		if (err) {
			return
		}

		console.log(`stdout: ${stdout}`)
		console.log(`stderr: ${stderr}`)
	})
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
