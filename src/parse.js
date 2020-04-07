exports.renderForm = (json) => {
    for (property in json) {
        document.body.append(json[property])
    }
}