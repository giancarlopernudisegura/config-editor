const { writeFile } = require('fs').promises
const { getFileName, recognizeType } = require('./load.js')
const { createDOM } = require('./form.js')

exports.formToJSON = (form, isArray) => {
    isArray = isArray || false
    let json = {}

    const getValue = (valueNode) => {
        let value
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
            if (valueNode.parentElement.parentElement.classList.contains('array')) {
                value = this.formToJSON(valueNode, true)
            } else {
                value = this.formToJSON(valueNode)
            }
        }
        return value
    }

    let fields = []
    // only adds fields and no other elements
    for (let field of form.childNodes)
        if (field.classList.contains('field'))
            fields.push(field)
    if (isArray) {
        let array = []
        for (let field of fields) {
            let value = getValue(field.firstElementChild.firstElementChild)
            array.push(value)
        }
        return array
    }
    for (let field of fields) {
        let label = field.firstElementChild.firstElementChild.value
        let value = getValue(field.childNodes[1].firstElementChild)
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
    showNotification()
}

const showNotification = _ => {
    let notification = createDOM('div.notification.is-success')
    let deleteFunction = 'this.parentNode.outerHTML = ""'
    let button = createDOM('button.delete')
    let text = 'File saved!'
    button.setAttribute('onclick', deleteFunction)
    button.setAttribute('onload', 'console.log(0)')
    notification.append(button, text)
    let notificationTray = document.querySelector('.notification-tray')
    notificationTray.append(notification)
    // delete after delay
    let delay = 2500 // ms
    setTimeout(_ => {
        notification.outerHTML = ''
    }, delay)
}

exports.getFilePath = (path) => path.replace(/([\w\s.]+)$/i, '')