const { app, BrowserWindow, ipcMain } = require('electron')
const { exec } = require('child_process')

// Keep global reference to window object, else window will close when garbage collected
let mainWindow
let subWindows = {}

function createMainWindow () {
	console.log('Creating window')
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		},
		transparent:true,
    	frame: false
	})

	mainWindow.loadFile('dist/index.html')

	// Open the DevTools.
	// mainWindow.webContents.openDevTools()

	mainWindow.on('closed', function () {
		mainWindow = null
	})
}

function createWindow(name, file, options) {
  if ( !subWindows[name] ) {
    subWindows[name] = new BrowserWindow(options)
    subWindows[name].on('closed', () => { subWindows[name] = null })
    subWindows[name].loadFile(`${file}`)
    subWindows[name].setMenu(null)
    // subWindows[name].checkUpdate = (open) => checkUpdate(open)
  }
}

app.on('ready', createMainWindow)

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', function () {
	if (mainWindow === null) {
		createMainWindow()
	}
})

ipcMain.on('add-service', function (event) {
	createWindow('asWin', 'dist/index.html', {parent: mainWindow, width: 600, height: 320})
})

ipcMain.on('open-create-window', function (event) {
	exec('open /Applications/Calculator.app', (err, stdout, stderr) => {
		if (err) {
			return;
		}

		console.log(`stdout: ${stdout}`);
		console.log(`stderr: ${stderr}`);
	});
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
