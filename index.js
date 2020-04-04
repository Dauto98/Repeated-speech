const { app, BrowserWindow } = require("electron");

// require('electron-reload')(__dirname);

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({width: 1000, height: 800});
	mainWindow.webContents.openDevTools({mode: 'bottom'});
	mainWindow.loadFile("./build/index.html");

	mainWindow.on("closed", () => {
		mainWindow = null
	});
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	// for MacOS
	if (process.platform !== "darwin") {
		app.quit();
	}
});

// for MacOS
app.on("activate", () => {
	if (mainWindow === null) {
		createWindow();
	}
})
