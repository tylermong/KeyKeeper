const { app, BrowserWindow, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
const fs = require('fs');

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Main Window Title',
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });

    const startUrl = url.format({
        pathname: path.join(__dirname, 'pages/html/vault.html'),
        protocol: 'file:',
        slashes: true
    });

    mainWindow.loadURL(startUrl);
}

app.whenReady().then(createMainWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
    }
});
