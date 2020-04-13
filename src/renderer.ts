/*
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import React, { Fragment, FC, createElement } from 'react'
import { map } from 'lodash'
import { BeagleUIElement, BeagleContext } from '@zup-it/beagle-web'
import { BeagleConfig } from './types'

const createReactComponentTree = <Schema>(
  components: BeagleConfig<Schema>['components'],
  ui: BeagleUIElement<Schema>,
  viewId: string,
): JSX.Element => {
  const { _beagleType_, children, id, ...props } = ui
  const Component = components[_beagleType_]

  if (!Component) {
    console.error(
      `Error: Beagle could not find component ${_beagleType_}. This component and its children won't be rendered.`
    )
    return createElement(Fragment)
  }

  const beagleContext = BeagleContext.getContext(viewId, id)
  const componentChildren = map(children, child =>
      createReactComponentTree(components, child, viewId))
  const componentProps = { ...props, key: id, beagleContext }

  return createElement(Component as FC<any>, componentProps, componentChildren)
}

export default createReactComponentTree
