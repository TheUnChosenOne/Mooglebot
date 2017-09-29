
const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const {Menu, globalShortcut} = require('electron')
const fs = require('fs')

app.on('ready', function () {
  const mainWindow = new BrowserWindow({width: 820, height: 600})
    // ,frame: false})
  mainWindow.loadURL(`file://${__dirname}/app/index.html`)

  // mainWindow.webContents.openDevTools();

  mainWindow.setResizable(false)
})

