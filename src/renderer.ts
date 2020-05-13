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

import { Fragment, FC, createElement } from 'react'
import { map } from 'lodash'
import { BeagleUIElement, BeagleContext } from '@zup-it/beagle-web'
import { BeagleConfig } from './types'

const createReactComponentTree = <Schema>(
  components: BeagleConfig<Schema>['components'],
  ui: BeagleUIElement<Schema>,
  viewId: string,
): JSX.Element => {
  const { _beagleType_, children, id, _context_, ...props } = ui
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
