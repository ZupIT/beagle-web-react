/*
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import { IdentifiableBeagleUIElement, BeagleView } from '@zup-it/beagle-web'
import { clone } from '@zup-it/beagle-web/dist/utils/tree-manipulation'
import { replaceBindings } from '../bindings'
import { DataContext } from '../types'
import setAttribute from './setAttribute'
import setContext from './setContext'
import xhr from './xhr'
import { ActionHandler, BeagleAction } from './types'

const defaultHandlers: Record<string, ActionHandler> = {
  setAttribute,
  setContext,
  xhr,
}

function createEventHandler(
  customActionHandlers: Record<string, ActionHandler> = {},
  beagleView: BeagleView,
) {
  Object.keys(customActionHandlers).forEach((actionType) => {
    if (defaultHandlers[actionType])
      console.warn(
        `A default handler with type ${actionType} exists. Are you sure you want to replace it?`,
      )
  })

  const actionHandlers = { ...defaultHandlers, ...customActionHandlers }

  const handleAction: ActionHandler = (params) => {
    const actionType = params.action._actionType_
    if (!actionHandlers[actionType]) {
      console.warn(`There is no action handler for action with type "${actionType}"`)
      return
    }
    
    if (params.action.debug) console.log('Dispatched:', params)
    const actionWithEventValues = replaceBindings(params.action, params.eventContextHierarchy)
    if (params.action.debug) console.log('Action after replacing bindings:', actionWithEventValues)
    actionHandlers[actionType]({ ...params, action: actionWithEventValues })
  }

  function isBeagleAction(element: IdentifiableBeagleUIElement) {
    return element && !!element._actionType_
  }

  function transformBeagleActionsToFunction(
    element: IdentifiableBeagleUIElement,
    eventName: string,
    actions: BeagleAction[],
    contextHierarchy: DataContext[],
  ) {
    return (event: any) => {
      actions.forEach(action => handleAction({
        action,
        eventContextHierarchy: [{ id: eventName, value: event }, ...contextHierarchy],
        element,
        handleAction,
        beagleView,
      }))
    }
  }

  function replaceBeagleActionsWithFunctions(
    element: IdentifiableBeagleUIElement,
    tree: IdentifiableBeagleUIElement,
    contextHierarchy: DataContext[] = [],
  ) {
    const keys = Object.keys(element)
    const ignore = ['id', '_beagleType_', '_context_', 'children']
    const hierarchy = element._context_
      ? [element._context_, ...contextHierarchy]
      : contextHierarchy

    keys.forEach((key) => {
      if (ignore.includes(key)) return
      const value = element[key]
      const isAction = isBeagleAction(value)
      const isActionArray = value instanceof Array && isBeagleAction(value[0])
      if (!isAction && !isActionArray) return
      const actions = isAction ? [value] : value
      element[key] = transformBeagleActionsToFunction(element, key, actions, hierarchy)
    })

    if (element.children)
      element.children.forEach(child => replaceBeagleActionsWithFunctions(child, tree, hierarchy))
  }

  function interpretEventsInTree(tree: IdentifiableBeagleUIElement) {
    const treeWithFunctions = clone(tree)
    replaceBeagleActionsWithFunctions(treeWithFunctions, treeWithFunctions)
    return treeWithFunctions
  }

  return {
    interpretEventsInTree,
  }
}

export type EventHandler = ReturnType<typeof createEventHandler>

export default createEventHandler
