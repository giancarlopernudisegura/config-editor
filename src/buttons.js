const form = require('./form')

exports.removeValue = (node) => {
    let keyPair = node.parentNode.parentNode
    if (keyPair.classList.contains('control'))
        keyPair = keyPair.parentNode
    // delete it
    keyPair.outerHTML = ''
}

exports.switchType = (def) => {
    let dropdownMenu = form.render.dropdown([
        'text',
        'number',
        'boolean',
        'array',
        'object'
    ], def)
    dropdownMenu.firstChild.onchange = function() {
        // change pair value type
    }
    // css manual activation
    dropdownMenu.onmouseover = function() {
        this.parentNode.firstChild.classList.add('is-hovered')
    }
    dropdownMenu.onmouseout = function() {
        this.parentNode.firstChild.classList.remove('is-hovered')
    }
    return dropdownMenu
}