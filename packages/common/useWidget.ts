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

import { useState, useEffect, useContext, useMemo } from 'react'
import { BeagleUIElement, BeagleView } from '@zup-it/beagle-web'
import BeagleProvider from './provider'

let nextId = 0

function useWidget(view: BeagleView) {
  const beagleService = useContext(BeagleProvider)
  const [uiTree, setUiTree] = useState<BeagleUIElement>()
  const viewID = useMemo(() => `${nextId++}`, [])

  if (!beagleService) throw Error('Couldn\'t find a BeagleProvider in the component tree!')

  useEffect(() => {
    view.onChange(setUiTree)
    beagleService.viewContentManagerMap.register(`${viewID}`, view)
    return () => {
      beagleService.viewContentManagerMap.unregister(`${viewID}`)
      view.destroy()
    }
  }, [])

  return {
    viewID,
    uiTree,
    beagleService,
  }
}

export default useWidget
