#!/usr/bin/env node

(async () => {
  const { constants, promises } = require('fs')
  const { access, mkdir, readFile, writeFile } = promises
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
    try {
      await access(`${path}/${beagleServicePath}`, constants.F_OK)
      return true
    } catch (error) {
      console.log("beagle/beagle-service.ts not found! Beagle settings used instead")
      return false
    }
  }

  const appTsxExists = async (path) => {
    try {
      await access(`${path}/app.tsx`, constants.F_OK)
      await overwriteAppTsx()
    } catch (error) {
      console.log("app.tsx not found! Beagle settings used instead")
      await createFile(`${dir}/${appTsx}`, appContent)
      process.exit()
    }
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
          process.exit()
        }
      }
      else {
        process.exit()
      }
    })
  }

  const beagleServiceFileExists = await beagleServiceExists(dir)

  if (!beagleServiceFileExists) {
    await createFile(`${dir}/${beagleServicePath}`, beagleContent)
    await appTsxExists(dir)
  }
  else {
    rl.question('Do you want to replace "beagle-service.ts" content with the Beagle default configuration (y or n)?', async (answer) => {
      if (`${answer}` === 'y' || `${answer}` === 'Y') {
        await createFile(`${dir}/${beagleServicePath}`, beagleContent)
        await appTsxExists(dir)
      }
      else {
        await appTsxExists(dir)
      }
    })
  }
})()
