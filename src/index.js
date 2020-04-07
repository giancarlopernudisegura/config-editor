const { ipcRenderer } = require('electron')
const { fileUpload } = require('./load.js')

ipcRenderer.send('file-open', 'ready to open file')

ipcRenderer.on('file-open', (event, arg) => {
    fileUpload(arg)
})