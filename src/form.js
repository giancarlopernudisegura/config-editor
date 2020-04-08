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

this.render.button = (color, iconId) => {
    let button = this.createDOM('button.button' + color)
    let icon = this.createDOM('span.icon')
    icon.append(this.createDOM('i.fas' + iconId))
    button.append(icon)
    return button
}

this.render.control = (DOM, buttons) => {
    let control = this.createDOM('p.control')
    control.append(DOM)
    if (buttons !== undefined)  {
        let btns = this.createDOM('div.btns')
        for (let btn of buttons) {
            btns.append(btn)
        }
        control.append(btns)
    }
    return control
}

this.render.form = (json, isArray) => {
    isArray = isArray || false
    let form = this.createDOM('div.form')
    for (property in json) {
        let field = this.createDOM('div.field')
        let label = this.createDOM('input.input')
        let switchButton = this.render.button('.is-info', '.fa-exchange-alt')
        let removeButton = this.render.button('.is-danger', '.fa-times')
        if (!isArray)
            field.append(this.render.control(label))
        label.value = property
        let value

        const nonRecursive = _ => {
            field.className += 'has-addons'
            field.append(
                this.render.control(value),
                this.render.control(switchButton),
                this.render.control(removeButton)
            )
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
                if (Array.isArray(json[property])) {
                    value = this.render.form(json[property], true)
                } else {
                    value = this.render.form(json[property])
                }
                field.className += 'recursive'
                switchButton.className += 'top'
                removeButton.className += 'bottom'
                field.append(this.render.control(value, [switchButton, removeButton]))
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