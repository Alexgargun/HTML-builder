var fs = require('fs');
var path = require('path');


fs.readdir('/secret-folder', (err, data) => {
    if (err) {
        throw err
    }
    console.log(data)
})