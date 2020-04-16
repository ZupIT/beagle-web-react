/*
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import set from 'lodash/set'
import { IdentifiableBeagleUIElement } from '@zup-it/beagle-web'
import { DataContext } from '../types'
import { ActionHandler, SetContextAction } from './types'

function getContextHierarchy(
  tree: IdentifiableBeagleUIElement,
  elementId: string,
  contextHierarchy: DataContext[] = [],
): DataContext[] | undefined {
  const hierarchy = tree._context_ ? [tree._context_, ...contextHierarchy] : contextHierarchy
  if (tree.id === elementId) return hierarchy
  if (!tree.children) return
  for (let i = 0; i < tree.children.length; i++) {
    const result = getContextHierarchy(tree.children[i], elementId, hierarchy)
    if (result) return result
  }
}

const setContext: ActionHandler<SetContextAction> = ({ action, element, beagleView }) => {
  const { value, context: contextId, path } = action
  const uiTree = beagleView.getTree()
  const contextHierarchy = getContextHierarchy(uiTree, element.id) || []
  const context = contextId
    ? contextHierarchy.find(({ id }) => id === contextId)
    : contextHierarchy[0]

  if (!context) {
    const specificContextMessage = (
      `Could not find context with id "${contextId}" for element of type "${element._beagleType_}" and id "${element.id}"`
    )
    const anyContextMessage = (
      `Could not find any context for element of type "${element._beagleType_}" and id "${element.id}"`
    )
    console.warn(contextId ? specificContextMessage : anyContextMessage)
    return
  }

  if (!path) context.value = value
  else {
    context.value = context.value || {}
    set(context.value, path, value)
  }

  beagleView.updateWithTree({ sourceTree: uiTree })
}

export default setContext
