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
    let type = recognizeType(path)
    updateTitle(document.querySelector('h1.title.is-1'), type)
    // load file, convert it to json, and render the form
    this.toObject(this.openFile(path), type)
        .then(data => {
            let sect = document.querySelector('.section.main')
            sect.innerHTML = ''
            sect.appendChild(render.form(data))
        })
}

const updateTitle = (DOM, str) => {
    DOM.innerText = `${str} - Config Editor`
}

const recognizeType = (path) => {
    let ending = /\.\w+$/i
    let type = path.match(ending)
    return type[0].substring(1)
}