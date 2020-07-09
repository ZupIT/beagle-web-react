
/*
  * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *  http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
*/

const { copyFileSync, existsSync, mkdirSync } = require('fs')
const dir = './dist/docs';

if (!existsSync(dir)) {
  mkdirSync(dir)
}

const filesToCopy = [
  { src: 'package.json', dest: './dist/package.json' },
  { src: 'README.md', dest: './dist/README.md' },
  { src: 'docs/debug_local.md', dest: './dist/docs/debug_local.md' }
]

filesToCopy.forEach(({ src, dest }) => copyFileSync(src, dest))
