exports.renderForm = (json) => {
    let form = this.createDOM('div.form')
    for (property in json) {
        let field = this.createDOM('div.field')
        let label = this.createDOM('label.label')
        label.innerHTML = property
        let value
        switch (typeof json[property]) {
            case 'string':
                value = this.createDOM('input.input')
                value.value = json[property]
                break;
            case 'number':
                value = this.createDOM('input.input')
                value.value = json[property]
                break;
            case 'boolean':
                value = this.createDOM('div.select')
                let select = this.createDOM('select')
                let opts = [true, false]
                for (let v of opts) {
                    let opt
                    opt = this.createDOM('option')
                    opt.value = v
                    opt.innerText = String(v)
                    if (v == json[property])
                        opt.selected = 'selected'
                    select.appendChild(opt)
                }
                value.appendChild(select)
                break;
            case 'object':
                value = this.renderForm(json[property])
                break;
        }
        field.appendChild(label)
        field.appendChild(value)
        form.appendChild(field)
    }
    return form
}

exports.createDOM = (str) => {
    let element = str.match(/^\w+/i)
        element = document.createElement(element)
    let classes = str.match(/\.\w+/gi)
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