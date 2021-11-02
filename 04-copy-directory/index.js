const fs = require('fs')
const path = require('path')

// fs.mkdir('/files-copy', { recursive: true }, (err) => {
//     if (err) throw err;
//   });

const readStream = fs.createReadStream('./files');
const writeStream = fs.createWriteStream('./files-copy');

readStream.pipe(writeStream)