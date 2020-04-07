exports.render = {}

this.render.dropdown = (values, def) => {
    inputDOM = this.createDOM('div.select')
    let select = this.createDOM('select')
    for (let v of values) {
        let opt
        opt = this.createDOM('option')
        opt.value = v
        opt.innerText = String(v)
        if (v == def)
            opt.selected = 'selected'
        select.append(opt)
    }
    inputDOM.append(select)
    return inputDOM
}

this.render.switchButton = _ => {
    // <i class="fas fa-exchange-alt"></i>
    let button = this.createDOM('button.button.info')
    let icon = this.createDOM('span.icon')
    icon.append(this.createDOM('i.fas.fa-exchange-alt'))
    button.append(icon)
    return button
}

this.render.control = (DOM, otherDOM) => {
    let control = this.createDOM('p.control')
    control.append(DOM)
    if (otherDOM !== undefined)
        control.append(otherDOM)
    return control
}

this.render.form = (json) => {
    let form = this.createDOM('div.form')
    for (property in json) {
        let field = this.createDOM('div.field')
        let label = this.createDOM('input.input')
        let switchButton = this.render.switchButton()
        label.value = property
        let value

        const nonRecursive = _ => {
            field.className += 'has-addons'
            field.append(this.render.control(label), this.render.control(value),this.render.control(switchButton))
        }

        const textOrNumber = _ => {
            value = this.createDOM('input.input')
            value.value = json[property]
            nonRecursive()
        }

        switch (typeof json[property]) {
            case 'string':
                textOrNumber()
                break
            case 'number':
                textOrNumber()
                value.type = 'number'
                break
            case 'boolean':
                value = this.render.dropdown([true, false], json[property])
                nonRecursive()
                break
            case 'object':
                value = this.render.form(json[property])
                field.className += 'recursive'
                field.append(this.render.control(label), this.render.control(value, switchButton))
                break
        }
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