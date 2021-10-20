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

function useWidget(id: string, view: BeagleView) {
  const beagleService = useContext(BeagleProvider)
  const [uiTree, setUiTree] = useState<BeagleUIElement>()

  if (!beagleService) throw Error('Couldn\'t find a BeagleProvider in the component tree!')

  useEffect(() => {
    view.onChange(setUiTree)
    beagleService.viewContentManagerMap.register(`${id}`, view)
    // the next two lines force a re-render in case this React component has been unmounted
    const tree = view.getTree()
    if (tree) view.getRenderer().doFullRender(tree)
    return () => {
      beagleService.viewContentManagerMap.unregister(`${id}`)
      view.destroy()
    }
  }, [])

  return {
    id,
    uiTree,
    beagleService,
  }
}

export default useWidget
