/*
 * Copyright 2020, 2022 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

  const beagleServiceExists = path => existsSync(`${path}/${beagleServicePath}`)

  const appTsxExists = async (path) => {
    const exists = existsSync(`${path}/app.tsx`)
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
        await createFile(`${dir}/app.tsx`, appContent)
        console.log("success! all configuration files were created correctly")
        process.exit()
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
      if (new RegExp(`^${answer}$`, 'i').test('y')) {
        await createFile(`${dir}/${beagleServicePath}`, beagleContent)
        appTsxExists(dir)
      }
      else {
        appTsxExists(dir)
      }
    })
  }
})()
