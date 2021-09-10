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
import {
  BeagleUIElement,
  BeagleView,
} from '@zup-it/beagle-web'
import BeagleProvider from './provider'
import { BeagleRemoteViewType } from './types'

let nextId = 0

function useComponent({
  id,
  viewRef,
  route,
  controllerId,
}: BeagleRemoteViewType) {
  const beagleService = useContext(BeagleProvider)
  const [uiTree, setUiTree] = useState<BeagleUIElement>()
  const [viewID, setViewID] = useState(id)

  if (!beagleService)
    throw Error('Couldn\'t find a BeagleProvider in the component tree!')

  const beagleView = useMemo<BeagleView>(() => {
    if (!id) setViewID(`${nextId++}`)

    const view = beagleService.createView(controllerId)
    view.subscribe(setUiTree)
    if (viewRef) viewRef.current = view

    return view
  }, [])

  useEffect(() => {
    if (route) {
      if (typeof route === 'string')
        route = { url: route }

      const navigator = beagleView.getNavigator()
      if (navigator.isEmpty()) navigator.pushView(route)
      else navigator.resetStack(route, controllerId)
    }
  }, [route])

  useEffect(() => {
    beagleService.viewContentManagerMap.register(`${viewID}`, beagleView)
    return () => {
      beagleService.viewContentManagerMap.unregister(`${viewID}`)
      beagleView.destroy()
    }
  }, [])

  return {
    viewID,
    uiTree,
    beagleService,
  }
}

export default useComponent
