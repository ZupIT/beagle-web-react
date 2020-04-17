/*
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import React, {
  FC,
  useState,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import {
  LoadParams,
  IdentifiableBeagleUIElement,
  BeagleView,
  BeagleContext,
  BeagleUIElement,
} from '@zup-it/beagle-web'
import { uniqueId } from 'lodash'
import { BeagleError } from '@zup-it/beagle-web/dist/errors'
import createEventHandler, { EventHandler } from './actions'
import { replaceBindings } from './bindings'
import BeagleProvider from './provider'
import createReactComponentTree from './renderer'

interface BeagleRemoteViewType extends LoadParams {
  id?: string,
}

const BeagleRemoteView: FC<BeagleRemoteViewType> = (loadParams: BeagleRemoteViewType) => {
  const beagleService = useContext(BeagleProvider)
  const [uiTree, setUiTree] = useState<BeagleUIElement>()
  const [viewID, setViewID] = useState(loadParams.id)
  let eventHandler: EventHandler | null = null
  
  if (!beagleService)
    throw Error('Couldn\'t find a BeagleProvider in the component tree!')

  const updateTree = (beagleUITree: IdentifiableBeagleUIElement) => {
    const uiTreeWithValues = replaceBindings(beagleUITree)
  
    if (!eventHandler)
      throw new Error(
        'Couldn\'t find an Event Handler! This is probably a bug within the Beagle library, please report'
      )
  
    const uiTreeWithActions = eventHandler.interpretEventsInTree(uiTreeWithValues)
    setUiTree(uiTreeWithActions)
  }

  const handleError = (errorListener: BeagleError[]) => {
    errorListener.forEach(error => console.error(error))
  }

  const beagleView = useMemo<BeagleView>(() => {
    if (!loadParams.id) setViewID(uniqueId())

    const view = beagleService.createView()
    view.subscribe(updateTree)
    view.addErrorListener(handleError)

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
    return () => BeagleContext.unregisterView(`${viewID}`)
  }, [])

  const renderComponents = () => {
    const components = beagleService.getConfig().components
    
    return uiTree && viewID
      ? createReactComponentTree(components, uiTree, viewID)
      : <></>
  }

  return renderComponents()
}

export default BeagleRemoteView
