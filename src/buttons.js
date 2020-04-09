const form = require('./form')

exports.removeValue = (node) => {
    let keyPair = node.parentNode.parentNode
    if (keyPair.classList.contains('control'))
        keyPair = keyPair.parentNode
    // delete it
    keyPair.outerHTML = ''
}

exports.switchType = (onChangeCallback) => {
    let def = 'Select a type...'
    let dropdownMenu = form.render.dropdown([
        def,
        'text',
        'number',
        'boolean',
        'array',
        'object'
    ], def)
    dropdownMenu.firstChild.onchange = onChangeCallback
    // css manual activation
    dropdownMenu.onmouseover = function() {
        this.parentNode.firstChild.classList.add('is-hovered')
    }
    dropdownMenu.onmouseout = function() {
        this.parentNode.firstChild.classList.remove('is-hovered')
    }
    return dropdownMenu
}