const { ipcRenderer } = require('electron')
const { fileUpload } = require('./load')
const { fileDownload } = require('./save')
const buttons = require('./buttons')

ipcRenderer.send('file-open', 'ready to open file')

ipcRenderer.on('file-open', (event, arg) => {
    fileUpload(arg)
})

ipcRenderer.send('file-save', 'ready to save file')

ipcRenderer.on('file-save', (event, arg) => {
    fileDownload(arg, document.querySelector('.section.main > .form'))
})