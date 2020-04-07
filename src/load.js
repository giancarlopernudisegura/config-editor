const { readFile } = require('fs').promises
const { render } = require('./form.js')

exports.openFile = async(path) => {
    return await readFile(path, 'utf8')
}

exports.toObject = async(d, type) => {
    let data = await d
    switch (type) {
        case 'json':
            return JSON.parse(data)
        default:
            console.error('File type not supported')
    }
}

exports.fileUpload = (path) => {
    let type = recognizeType(getFileName(path))
    updateTitle(document.querySelector('h1.title.is-1'), path)
    // load file, convert it to json, and render the form
    this.toObject(this.openFile(path), type)
        .then(data => {
            let sect = document.querySelector('.section.main')
            sect.innerHTML = ''
            sect.appendChild(render.form(data))
        })
}

const updateTitle = (DOM, path) => {
    let file = getFileName(path)
    console.log(file)
    DOM.innerText = `${file} - Config Editor`
    let windowTitle = document.querySelector('title')
    windowTitle.innerHTML = `Config Editor - ${path}`
}

const getFileName = (path) => path.match(/([A-Z.]+)$/i)[0]

const recognizeType = (fileName) => fileName.match(/\w+$/i)[0]