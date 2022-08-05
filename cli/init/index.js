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
  const srcPath = 'src'
  const beaglePath = `${srcPath}/beagle`
  const yes = (answer) => /^(y|yes)$/gi.test(answer)
  const questionAsync = (query) => new Promise((resolve) => { 
    require('readline')
      .createInterface({ input: process.stdin, output: process.stdout })
      .question(query, (answer) => { resolve(answer) })
  })
  const getBoilerplateContent = async (path) => await readFile(`${__dirname}/boilerplate/${path}`)
  
  const createFile = async (path, content) => {
    try {
      await writeFile(path, content, 'utf8')
    } catch (e) {
      console.error(e)
      process.exit(1)
    }
  }
  
  const createOrOverrideFile = async (path, content) => {
    try {
      await access(path, constants.F_OK)
      const answer = await questionAsync(`The file "${path}" already exists! Do you want to replace the content with the Beagle configuration (Y/N)?`)
      yes(answer) && await createFile(path, content)
    } catch (_) {
      console.log(_)
      await createFile(path, content)
    }
  }

  await mkdir(beaglePath, { recursive: true })
  await createOrOverrideFile(`${beaglePath}/beagle-service.ts`, await getBoilerplateContent('beagle-service.ts'))
  await createOrOverrideFile(`${srcPath}/App.tsx`, await getBoilerplateContent('App.tsx'))
  /** Due to some issues related to Create React App (CRA) after version 5, this file is needed to be created.
   * More here:
   * Discussion: https://github.com/facebook/create-react-app/discussions/11767
   * Pull to br merged: https://github.com/facebook/create-react-app/pull/11752
   */
  await createOrOverrideFile('.env', 'GENERATE_SOURCEMAP=false')
  console.log("success! all configuration files were created correctly")
  process.exit()
})()
