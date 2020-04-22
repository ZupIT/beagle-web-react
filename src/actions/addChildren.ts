/*
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import { findById } from '@zup-it/beagle-web/dist/utils/tree-reading'
import { ActionHandler, AddChildrenAction } from './types'

const addChildren: ActionHandler<AddChildrenAction> = ({ action, beagleView }) => {
  const { componentId, value, method = 'append' } = action
  const uiTree = beagleView.getTree()
  const component = findById(uiTree, componentId)

  if (!component) {
    console.warn(`No component with id ${componentId} has been found in the tree`)
    return
  }

  const currentChildren = component.children || []
  component.children = method === 'append'
    ? [...currentChildren, ...value]
    : [...value, ...currentChildren]

  beagleView.updateWithTree({ sourceTree: uiTree })
}

export default addChildren
