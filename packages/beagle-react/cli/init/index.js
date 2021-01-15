#!/usr/bin/env node
const fs = require('fs')
const fsPromises = fs.promises
const dir = 'src/beagle'

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir)
}

(async () => {

  async function readFileContent(path) {
    try {
      data = await fsPromises.readFile(path, (err, data) => {
        if (err) throw err
        else {
          data = data.toString('utf8')
        }
      })
    } finally {
      if (data !== undefined)
        return data
    }
  }

  const beagleContent = await readFileContent(__dirname + '/boilerplate/beagle-service.ts')
  const appContent = await readFileContent(__dirname + '/boilerplate/App.tsx')
  const readline = require('readline')
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  fs.writeFile('src/beagle/beagle-service.ts', beagleContent, function (err) {
    if (err) throw err
  })

  rl.question('Want to replace app.tsx with the Beagle configuration (y or n) ?', (answer) => {
    if (`${answer}` === 'y') {
      fs.writeFile('src/App.tsx', appContent, function (err) {
        if (err) throw err
        process.exit()
      })
    }
    else {
      process.exit()
    }
  })
})()