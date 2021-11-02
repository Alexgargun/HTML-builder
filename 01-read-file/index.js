const fs = require('fs');
const stream = fs.createReadStream(__dirname + '/text.txt', 'utf-8');
stream.on('data', content => console.log(content));



