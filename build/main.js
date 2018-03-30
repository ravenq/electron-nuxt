process.env.NODE_ENV = process.env.NODE_ENV || 'production'
let win = null // Current window

/*
** Electron app
*/
const electron = require('electron')
const path = require('path')
const url = require('url')
const app = electron.app
const bw = electron.BrowserWindow

const newWin = () => {
  win = new bw({
    width: 800,
    height: 600
  })
  if (true) {
    return win.loadURL("http://localhost:3000/SystemInformation")
  }
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  win.on('closed', () => win = null)
}

app.on('ready', newWin)
app.on('window-all-closed', () => app.quit())
app.on('activate', () => win === null && newWin())
