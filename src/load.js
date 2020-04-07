const { readFile } = require('fs').promises
const { render } = require('./form.js')

exports.loadFile = async(path) => {
    return await readFile(path, 'utf8')
}

exports.toObject = async(d, type) => {
    let data = await d
    switch (type) {
        case 'application/json':
            return JSON.parse(data)
        default:
            console.error('File type not supported')
    }
}

exports.fileUpload = (DOM) => {
    let label = document.querySelector('.file-name')
    if (DOM.files.length > 0) {
        let file = DOM.files[0]
        let type = file.type
        updateLabel(label, file.name)
        // load file, convert it to json, and render the form
        this.toObject(this.loadFile(file.path), type)
            .then(data => {
                let sect = document.querySelector('.section.main')
                sect.appendChild(render.form(data))
            })
    } else {
        updateLabel(label, "No File Chosen")
    }
}

const updateLabel = (DOM, str) => {
    DOM.innerHTML = str
}

const recognizeType = (path) => {
    let ending = /\.\w+$/i
    let type = path.match(ending)
    return type[0].substring(1)
}