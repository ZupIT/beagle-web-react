#!/usr/bin/env node

(async () => {
  const { constants, promises, existsSync } = require('fs')
  const { access, mkdir, readFile, writeFile } = promises
  const fileOptions = { encoding: 'utf8' }
  const dir = "src"
  const beagleContent = await readFile(__dirname + '/boilerplate/beagle-service.ts')
  const appContent = await readFile(__dirname + '/boilerplate/app.tsx')
  const readline = require('readline')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  await mkdir(`${dir}/beagle/`, { recursive: true });
  await writeFile(
    `${dir}/beagle/beagle-service.ts`,
    beagleContent,
    fileOptions,
  )

  const createAppTsx = async (path, content) => {
    try {
      await writeFile(`${path}/app.tsx`, content)
      process.exit()
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  }
  const appTsxExists = async (path) => {
    try {
      await access(`${path}/app.tsx`, constants.F_OK)
      return true
    } catch (error) {
      console.error("app.tsx did not exist, it was created with Beagle settings.")
      return false
    }
  }
  const appFileExists = await appTsxExists(dir)
  if (!appFileExists) {
    createAppTsx(dir, appContent)
  }
  else {
    rl.question('Do you want to replace "app.tsx" content with the Beagle configuration (y or n)?', (answer) => {
      if (`${answer}` === 'y' || `${answer}` === 'Y') {
        createAppTsx(dir, appContent)
      }
      else {
        process.exit()
      }
    })
  }
})()
