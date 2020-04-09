exports.removeValue = (node) => {
    let keyPair = node.parentNode.parentNode
    if (keyPair.classList.contains('control'))
        keyPair = keyPair.parentNode
    // delete it
    keyPair.outerHTML = ''
}