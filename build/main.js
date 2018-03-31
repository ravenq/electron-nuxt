process.env.NODE_ENV = process.env.NODE_ENV || 'production'
let win = null // Current window
const electron = require('electron')
const path = require('path')
const url = require('url')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const isDev = !(process.env.NODE_ENV === 'production')

const newWin = () => {
  win = new BrowserWindow({
    width: 800,
    height: 600
  })
  if (isDev) {
    return win.loadURL("http://localhost:3000") // eslint-disable-line
  }
  win.loadURL(url.format({
    pathname: path.join(__dirname, '../dist/index.html'),
    protocol: 'file:',
    slashes: true
  }))
  win.on('closed', () => win = null) // eslint-disable-line
}

app.on('ready', newWin)
app.on('window-all-closed', () => app.quit())
app.on('activate', () => win === null && newWin())
