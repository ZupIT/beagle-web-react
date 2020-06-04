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
import { BeagleConfig } from '@zup-it/beagle-web'
import { ComponentName } from '@zup-it/beagle-web/types'


function createMapOfKeys<Schema> (components: BeagleConfig<Schema>['components']) {
  const keys = Object.keys(components)
  return keys.reduce((result, key) => ({ ...result, [key.toLowerCase()]: key }), {})
}

const getMapKeysOfComponents = (<Schema>() => {
  const Memo: Record<string, Record<string, ComponentName<Schema>>> = {}

  return (components: BeagleConfig<Schema>['components']) => {
    const keyMap = JSON.stringify(components) 
    if (Memo && Memo[keyMap]) 
      return Memo[keyMap]
    else
      return (Memo[keyMap] = createMapOfKeys(components))
  }
    
})()

export const getComponentKey = <Schema> (
  components: BeagleConfig<Schema>['components'], 
  name: ComponentName<Schema>
) => {
  const mapKeysOfComponents = getMapKeysOfComponents(components)
  return mapKeysOfComponents[(name as string).toLowerCase()]
}
