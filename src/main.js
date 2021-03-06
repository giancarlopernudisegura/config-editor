const { app, BrowserWindow, Menu, dialog, ipcMain } = require('electron')
const { getFilePath } = require('./save')
const projectDir = 'src/'
const isMac = process.platform === 'darwin'

let path

let loadEvent
ipcMain.on('file-open', (event, arg) => {
  loadEvent = event
})

let saveEvent
ipcMain.on('file-save', (event, arg) => {
  saveEvent = event
})

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile(projectDir + 'index.html')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(_ => {
  createWindow()
  const template = [
    // { role: 'appMenu' }
    ...(isMac ? [{
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),
    // { role: 'fileMenu' }
    {
      label: 'File',
      submenu: [
        { type: 'separator' },
        {
          label: 'Open File...',
          accelerator: 'CmdOrCtrl+O',
          click: _ => {
            dialog.showOpenDialog({
              properties: [
                'openFile',
                'showHiddenFiles'
              ]
            }).then(({canceled, filePaths}) => {
              path = filePaths[0]
              if (!canceled)
                loadEvent.reply('file-open', path)
            })
          }
        },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click: _ => {
            saveEvent.reply('file-save', path)
          }
        },
        {
          label: 'Save As...',
          accelerator: 'CmdOrCtrl+Shift+S',
          click: _ => {
            try {
              dialog.showSaveDialog({
                defaultPath: getFilePath(path),
                properties: [
                  'showHiddenFiles',
                  'createDirectory',
                  'showOverwriteConfirmation'
                ]
              }).then(({canceled, filePath}) => {
                path = filePath
                if (!canceled) {
                  saveEvent.reply('file-save', path)
                  console.log(path)
                  loadEvent.reply('file-open', path)
                }
              })
            } catch (TypeError) {
              dialog.showMessageBox({
                type: 'error',
                message: 'Can\'t save a file that isn\'t loaded...',
                buttons: [
                  'ok'
                ]
              })
            }
          }
        },
        { type: 'separator' },
        isMac ? { role: 'close' } : { role: 'quit' }
      ]
    },
    // { role: 'editMenu' }
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        ...(isMac ? [
          { role: 'pasteAndMatchStyle' },
          { role: 'delete' },
          { role: 'selectAll' },
          { type: 'separator' },
          {
            label: 'Speech',
            submenu: [
              { role: 'startspeaking' },
              { role: 'stopspeaking' }
            ]
          }
        ] : [
          { role: 'delete' },
          { type: 'separator' },
          { role: 'selectAll' },
          { type: 'separator' },
          { role: 'toggledevtools' }
        ])
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'About',
          click: async () => {
            const { shell } = require('electron')
            await shell.openExternal('https://github.com/giancarlopernudisegura/config-editor/')
          }
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (!isMac) {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})