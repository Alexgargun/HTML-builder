const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin, 
  output: process.stdout
})

const fs = require('fs')

const writeTextFile = (answer) => {
  fs.appendFile(__dirname + '/text.txt', answer, err => {
    if (err) {
      throw err
    }
  })
}

rl.question('Hello! Enter some text :', (answer) => {    
  rl.on('line', line => {
    if (line === 'exit') {
      console.log('Good buy')
      process.exit(0)
    }
  })
  writeTextFile(answer)
})

  
  process.on('exit', (code) => {
    console.log('Process exit event with code: ', code);
  });
  
  
 