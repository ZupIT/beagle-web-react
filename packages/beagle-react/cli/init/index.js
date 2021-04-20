(async () => {
  const fs = require('fs')
  const fsPromises = fs.promises
  const fileOptions = { encoding: 'utf8' }
  const dir = "src"
  const beagleContent = await fsPromises.readFile(__dirname + '/boilerplate/beagle-service.ts')
  const appContent = await fsPromises.readFile(__dirname + '/boilerplate/App.tsx')
  const readline = require('readline')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  await fs.promises.mkdir(`${dir}/beagle/`, { recursive: true });
  await fsPromises.writeFile(`${dir}/beagle/beagle-service.ts`, beagleContent, fileOptions)

  const createAppTsx = async (path, content) => {
    try {
      await fsPromises.writeFile(`${path}/app.tsx`, content)
      process.exit()
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  }
  if (!fs.existsSync(`${dir}/app.tsx`)) {
    createAppTsx(dir, appContent)
  }
  else {
    rl.question('Do you want to replace "app.tsx" content with the Beagle configuration (y or n)?', (answer) => {
      if (`${answer}` === 'y' || 'Y') {
        createAppTsx(dir, appContent)
      }
      else {
        process.exit()
      }
    })
  }
})()