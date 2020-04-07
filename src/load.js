const { readFile } = require('fs')

exports.loadFile = (path) => {
    readFile(path, (err, data) => {
        if (err) throw err;
        console.log(typeof data);
        console.log(data);
    })
}