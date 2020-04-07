const renderBoolean = (val) => {
    inputDOM = this.createDOM('div.select')
    let select = this.createDOM('select')
    let opts = [true, false]
    for (let v of opts) {
        let opt
        opt = this.createDOM('option')
        opt.value = v
        opt.innerText = String(v)
        if (v == val)
            opt.selected = 'selected'
        select.append(opt)
    }
    inputDOM.append(select)
    return inputDOM
}

const renderSwitchButton = _ => {
    // <i class="fas fa-exchange-alt"></i>
    let button = this.createDOM('button.button.info')
    let icon = this.createDOM('span.icon')
    icon.append(this.createDOM('i.fas.fa-exchange-alt'))
    button.append(icon)
    return button
}

exports.renderForm = (json) => {
    let form = this.createDOM('div.form')
    for (property in json) {
        let field = this.createDOM('div.field')
        let label = this.createDOM('label.label')
        let switchButton = renderSwitchButton()
        label.innerHTML = property
        let value
        switch (typeof json[property]) {
            case 'string':
                value = this.createDOM('input.input')
                value.value = json[property]
                break
            case 'number':
                value = this.createDOM('input.input')
                value.value = json[property]
                break
            case 'boolean':
                value = renderBoolean(json[property])
                break
            case 'object':
                value = this.renderForm(json[property])
                break
        }
        field.append(label, value, switchButton)
        form.append(field)
    }
    return form
}

exports.createDOM = (str) => {
    let element = str.match(/^\w+/i)
        element = document.createElement(element)
    let classes = str.match(/\.(\w-*)+/gi)
    if (classes !== null) {
        for (let cls of classes) {
            element.className += `${cls.substring(1)} `
        }
    }
    let id = str.match(/#\w+/gi)
    if (id !== null)
        element.id = id[0].substring(1)
    return element
}