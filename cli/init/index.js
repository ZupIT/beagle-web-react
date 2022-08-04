#!/usr/bin/env node

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

(async () => {
  const { constants, promises: { access, mkdir, readFile, writeFile } } = require('fs')
  const paths = {
    src: 'src',
    appTsx: 'app.tsx',
    beagleService: 'beagle/beagle-service.ts',
    beagleServiceFile: 'beagle-service.ts',
  }
  
  const questionAsync = (query) => new Promise((resolve) => {
    require('readline').createInterface({ input: process.stdin, output: process.stdout }).question(query, (answer) => { resolve(answer) })
  })
  
  const createFile = async (path, contentOrPath, fetchContent = false) => {
    try {
      let fileContent = contentOrPath
      if (fetchContent) fileContent = await readFile(`${__dirname}/boilerplate/${contentOrPath}`)
      await writeFile(`${paths.src}/${path}`, fileContent, 'utf8')
    } catch (e) {
      console.error(e)
      process.exit(1)
    }
  }
  
  const createBeagleFile = async (path, name) => {
    try {
      await access(`${paths.src}/${path}`, constants.F_OK)
      const answer = await questionAsync(`The file "${name}" already exists! Do you want to replace the content with the Beagle configuration (Y/N)?`)
      if (/^(y|yes)$/gi.test(answer)) await createFile(path, name, true)
    } catch (_) {
      await createFile(path, name, true)
    }
  }

  await mkdir(`${paths.src}/beagle/`, { recursive: true })
  createBeagleFile(paths.beagleService, paths.beagleServiceFile)
  createBeagleFile(paths.appTsx, paths.appTsx)
  console.log("success! all configuration files were created correctly")
  process.exit()
})()
