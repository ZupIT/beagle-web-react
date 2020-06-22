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

import React, {
  FC,
  useState,
  useContext,
  useEffect,
  useMemo,
  MutableRefObject,
} from 'react'
import {
  LoadParams,
  IdentifiableBeagleUIElement,
  BeagleView,
  BeagleContext,
  BeagleUIElement,
  createEventHandler,
  EventHandler,
  replaceBindings,
} from '@zup-it/beagle-web'
import { uniqueId } from 'lodash'
import { BeagleError } from '@zup-it/beagle-web/errors'
import BeagleProvider from './provider'
import createReactComponentTree from './renderer'

interface BeagleRemoteViewType extends LoadParams {
  id?: string,
  viewRef?: MutableRefObject<BeagleView | undefined>,
  onCreateBeagleView?: (view: BeagleView) => void,
}

const BeagleRemoteView: FC<BeagleRemoteViewType> = (loadParams: BeagleRemoteViewType) => {
  const beagleService = useContext(BeagleProvider)
  const [uiTree, setUiTree] = useState<BeagleUIElement>()
  const [viewID, setViewID] = useState(loadParams.id)
  let eventHandler: EventHandler | null = null
  
  if (!beagleService)
    throw Error('Couldn\'t find a BeagleProvider in the component tree!')

  const updateTree = (beagleUITree: IdentifiableBeagleUIElement) => {
    if (!eventHandler)
      throw new Error(
        'Couldn\'t find an Event Handler! This is probably a bug within the Beagle library, please report'
      )
  
    const uiTreeWithActions = eventHandler.interpretEventsInTree(beagleUITree)
    const uiTreeWithValues = replaceBindings(uiTreeWithActions)
    setUiTree(uiTreeWithValues)
  }

  const handleError = (errorListener: BeagleError[]) => {
    errorListener.forEach(error => console.error(error))
  }

  const beagleView = useMemo<BeagleView>(() => {
    if (!loadParams.id) setViewID(uniqueId())
    
    const view = beagleService.createView(loadParams.path)
    view.subscribe(updateTree)
    view.addErrorListener(handleError)
    if (loadParams.viewRef) loadParams.viewRef.current = view

    return view
  }, [])

  eventHandler = useMemo(
    () => createEventHandler(beagleService.getConfig().customActions, beagleView),
    [beagleView],
  )

  useEffect(() => {
    beagleView.updateWithFetch(loadParams)
  }, [loadParams])

  useEffect(() => {
    BeagleContext.registerView(`${viewID}`, beagleView)
    loadParams.onCreateBeagleView && loadParams.onCreateBeagleView(beagleView)
    return () => BeagleContext.unregisterView(`${viewID}`)
  }, [])

  const renderComponents = () => {
    if (!uiTree || !viewID) return <></>
    const components = beagleService.getConfig().components
    
    return createReactComponentTree(components, uiTree, viewID)
  }

  return renderComponents()
}

export default BeagleRemoteView
