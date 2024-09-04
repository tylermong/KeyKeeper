const {app, BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Main Window Title',
        width: 1280,
        height: 720,
    });
 
    const startUrl = url.format({
        pathname: path.join(__dirname, 'vault.html'),
        protocol: 'file:',
    });

    mainWindow.loadURL(startUrl);
}

app.whenReady().then(createMainWindow);