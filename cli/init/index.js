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
  const { question } = require('readline').createInterface({ input: process.stdin, output: process.stdout })
  const srcPath = 'src'
  const beaglePath = 'beagle'
  const yes = (answer) => /^(y|yes)$/gi.test(answer)
  const getDirPath = (path) => `${srcPath}/${path}`
  const questionAsync = (query) => new Promise((resolve) => { question(query, (answer) => { resolve(answer) }) })
  
  const createFile = async (path, contentOrPath, fetchContent = false) => {
    try {
      let fileContent = contentOrPath
      if (fetchContent) fileContent = await readFile(`${__dirname}/boilerplate/${contentOrPath}`)
      await writeFile(getDirPath(path), fileContent, 'utf8')
    } catch (e) {
      console.error(e)
      process.exit(1)
    }
  }
  
  const createBeagleFile = async (path, name) => {
    try {
      await access(getDirPath(path), constants.F_OK)
      const answer = await questionAsync(`The file "${name}" already exists! Do you want to replace the content with the Beagle configuration (Y/N)?`)
      yes(answer) && await createFile(path, name, true)
    } catch (_) {
      await createFile(`${path}/${name}`, name, true)
    }
  }

  await mkdir(`${srcPath}/${beaglePath}/`, { recursive: true })
  await createBeagleFile(beaglePath, 'beagle-service.ts')
  await createBeagleFile('', 'App.tsx')
  console.log("success! all configuration files were created correctly")
  process.exit()
})()
