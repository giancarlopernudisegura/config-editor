const { writeFile } = require('fs').promises
const { getFileName, recognizeType } = require('./load.js')

exports.formToJSON = (form) => {
    let json = {}
    let fields = form.childNodes
    for (let field of fields) {
        let label = field.firstElementChild.firstElementChild.value
        let value
        let valueNode = field.childNodes[1].firstElementChild
        if (!valueNode.classList.contains('form')) {
        if (valueNode.nodeName === 'INPUT') {
            value = valueNode.value
            if (valueNode.type === 'number') {
                value = parseFloat(value)
            }
        } else if (valueNode.nodeName === 'DIV') {
            valueNode.firstElementChild.value === 'true' ? value = true : value = false
        }
        } else {
            value = this.formToJSON(valueNode)
        }
        json[label] = value
    }
    return json
}

// converts JSON to string of specified data type
exports.toString = (json, type) => {
    let str
    switch (type) {
        case 'json':
            str =  JSON.stringify(json)
            break
    }
    return str
}

exports.fileDownload = (path, form) => {
    let json = this.formToJSON(form)
    let type = recognizeType(getFileName(path))
    let data = this.toString(json, type)
    writeFile(path, data)
    // add some saved notification in the future
}

exports.getFilePath = (path) => path.replace(/([\w\s.]+)$/i, '')