#!/usr/bin/env node
const fs = require('fs')
const fsPromises = fs.promises
const dir = 'src'
const fileOptions = { encoding: 'utf8' }

fs.mkdirSync(dir, { recursive: true })

if (!fs.existsSync(dir + '/beagle/')) {
  fs.mkdirSync(dir + '/beagle/')
}

(async () => {
  const beagleContent = await fsPromises.readFile(__dirname + '/boilerplate/beagle-service.ts')
  const appContent = await fsPromises.readFile(__dirname + '/boilerplate/App.tsx')
  const readline = require('readline')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  await fsPromises.writeFile('src/beagle/beagle-service.ts', beagleContent, fileOptions)

  if (!fs.existsSync(dir + '/app.tsx')) {
    fs.writeFile(dir + '/app.tsx', appContent, function (err) {
      if (err) throw err
      process.exit()
    })
  }
  else {
    rl.question('Do you want to replace "app.tsx" content with the Beagle configuration (y or n)?', (answer) => {
      if (`${answer}` === 'y') {
        fs.writeFile('src/app.tsx', appContent, function (err) {
          if (err) throw err
          process.exit()
        })
      }
      else {
        process.exit()
      }
    })
  }
})()