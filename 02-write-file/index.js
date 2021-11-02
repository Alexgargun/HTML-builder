// const {stdout, stdin} = process
// const fs = require('fs')
// const path = require('path')

// fs.writeFile(__dirname + '/data.md', err => {
//   if (err) {
//     console.error(err)
//     return
//   }
// })

// stdout.write('Hello! Enter some  text: ')
// stdin.on('data', data => {
//     let str = data.toString();
//     if (str === 'exit') {
//         process.exit()
//     }   else {
//         fs.writeFile(
//             path.join(__dirname, '/data.md'), data, err => {
//                 if (err) {
//                     throw err
//                 }
//             }
//         )
//     }
// })

const fs = require('fs')
const process = require('process')
// const { Stream } = require('stream')

const content = 'Hello! Enter some  text: '

 function inputText() {
     process.stdout.write(content)
 }

 inputText()

const exit = 'Good Buy for Now!'

// function goodBuy() {
//     if(str === 'exit') {
//         process.exit()
//     }
//     console.log(exit)
// }

// goodBuy()


// process.stdin.on('data', function (content) {
//     fs.writeFile(__dirname + '/text.txt', content, err => {
//         if (err) {
//           throw err
//         }
//       })
// })

// fs.writeFile(__dirname + '/text.txt', content, err => {
//   if (err) {
//     throw err
//   }
// })

// const process = require('process');

// process.on('beforeExit', (code) => {
//     console.log('Process beforeExit event with code: ', code);
//   });
  
  process.on('exit', (code) => {
    console.log('Process exit event with code: ', code);
  });
  
  
  // Prints:
  // This message is displayed first.
  // Process beforeExit event with code: 0
  // Process exit event with code: 0

// const http = require('http')
// const fs = require('fs')
// const process = require ('process')
// const sayHello = 'Hi!, enter some text: '
// const output = fs.createWriteStream(__dirname + '/data.md')

// function inputText() {
//     process.stdout.write(sayHello)
// }

// process.stdin.on('data', function (data) {
//     output.push(data.toString())
// })

// inputText()

// const input = fs.createReadStream(__dirname + '/text.txt', 'utf-8')


// const output = fs.createWriteStream(__dirname + '/data.md')


// input.on('data', content => output.write(content))
// input.on('error', error => console.log('Error', error.message));



// const process = require ('process');

// process.on('beforeExit', (code) => {
//   console.log('Process beforeExit event with code: ', code);
// });

// process.on('exit', (code) => {
//   console.log('Process exit event with code: ', code);
// });

// console.log('This message is displayed first.');


// process.on( "SIGINT", function() {
//     console.log( "\ngracefully shutting down from SIGINT (Crtl-C)" );
//     process.exit();
//   } );
  
//   process.on( "exit", function() {
//     console.log( "never see this log message" );
//   } );
  
//   setInterval( () => console.log( "tick" ), 2500 );