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
  logger,
  LoadParams,
} from '@zup-it/beagle-web'
import BeagleProvider from './provider'
import { BeagleRemoteViewType } from './types'

let nextId = 0

function useComponent({
  id,
  viewRef,
  route,
  networkOptions,
  controllerId,
  ...deprecated
}: BeagleRemoteViewType) {
  const beagleService = useContext(BeagleProvider)
  const [uiTree, setUiTree] = useState<BeagleUIElement>()
  const [viewID, setViewID] = useState(id)
  
  if (!beagleService)
    throw Error('Couldn\'t find a BeagleProvider in the component tree!')

  const beagleView = useMemo<BeagleView>(() => {
    if (!id) setViewID(`${nextId++}`)
    
    const view = beagleService.createView(networkOptions, controllerId)
    view.subscribe(setUiTree)
    if (viewRef) viewRef.current = view

    return view
  }, [])

  useEffect(() => {
    if (route) {
      const navigator = beagleView.getNavigator()
      if (navigator.isEmpty()) navigator.pushView({ url: route })
      else navigator.resetStack({ url: route }, controllerId)
    }
  }, [route])

  // todo: legacy code. Remove with v2.0.
  useEffect(() => {
    const deprecatedKeys = Object.keys(deprecated)

    if (deprecatedKeys.length) {
      logger.warn(`The following properties in the BeagleRemoteView are deprecated and will be removed in v2.0: ${deprecatedKeys.join(', ')}.\nYou should use "route" to specify the path to the first view and "navigationOptions" for further request setup.`)
      if (route) {
        logger.warn('You shouldn\'t mix the new BeagleRemoteView properties with the deprecated ones. All deprecated properties will be ignored.')
      } else if (deprecated.path) {
        beagleView.fetch(deprecated as LoadParams)
      }
    }
  }, [JSON.stringify(deprecated)])

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
