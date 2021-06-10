#!/usr/bin/env node

(async () => {
  const { promises, existsSync } = require('fs')
  const { mkdir, readFile, writeFile } = promises
  const fileOptions = { encoding: 'utf8' }
  const dir = "src"
  const beagleContent = await readFile(__dirname + '/boilerplate/beagle-service.ts')
  const appContent = await readFile(__dirname + '/boilerplate/app.tsx')
  const appTsx = 'app.tsx'
  const beagleServicePath = 'beagle/beagle-service.ts'
  const readline = require('readline')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  await mkdir(`${dir}/beagle/`, { recursive: true });

  const beagleServiceExists = async (path) => {
    const exists = await existsSync(`${path}/${beagleServicePath}`)
    return exists
  }

  const appTsxExists = async (path) => {
    const exists = await existsSync(`${path}/app.tsx`)
    if (exists) {
      overwriteAppTsx()
    }
    else {
      generateAppTsx()
    }
  }

  const generateAppTsx = async () => {
    await createFile(`${dir}/${appTsx}`, appContent)
    console.log("success! all configuration files were created correctly")
    process.exit()
  }

  const createFile = async (path, content) => {
    try {
      await writeFile(path, content, fileOptions)
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  }

  const overwriteAppTsx = async () => {
    rl.question('Do you want to replace "app.tsx" content with the Beagle configuration (y or n)?', async (answer) => {
      if (new RegExp(`^${answer}$`, 'i').test('y')) {
        if (`${answer}` === 'y' || `${answer}` === 'Y') {
          await createFile(`${dir}/app.tsx`, appContent)
          console.log("success! all configuration files were created correctly")
          process.exit()
        }
      }
      else {
        console.log("success! all configuration files were created correctly")
        process.exit()
      }
    })
  }

  const beagleServiceFileExists = await beagleServiceExists(dir)

  if (!beagleServiceFileExists) {
    await createFile(`${dir}/${beagleServicePath}`, beagleContent)
    appTsxExists(dir)
  }
  else {
    rl.question('Do you want to replace "beagle-service.ts" content with the Beagle default configuration (y or n)?', async (answer) => {
      if (`${answer}` === 'y' || `${answer}` === 'Y') {
        await createFile(`${dir}/${beagleServicePath}`, beagleContent)
        appTsxExists(dir)
      }
      else {
        appTsxExists(dir)
      }
    })
  }
})()
