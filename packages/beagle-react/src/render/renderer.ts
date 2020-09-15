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
import map from 'lodash/map'
import { BeagleUIElement, ViewContentManagerMap } from '@zup-it/beagle-web'
import { BeagleConfig } from 'common/types'
import { getComponentByCaseInsensitiveKey } from 'common/utils/beagleComponent'
import BeagleId from './BeagleId'

const createReactComponentTree = <Schema>(
  components: BeagleConfig<Schema>['components'],
  ui: BeagleUIElement<Schema>,
  viewId: string,
  contentManagerMap: ViewContentManagerMap,
): JSX.Element => {
  const { _beagleComponent_, children, id, context, ...props } = ui

  if (!_beagleComponent_) return createElement(Fragment)

  const Component = getComponentByCaseInsensitiveKey(components, _beagleComponent_)

  if (!Component) {
    console.error(
      `Error: Beagle could not find component ${_beagleComponent_}. This component and its children won't be rendered.`
    )
    return createElement(Fragment)
  }

  const beagleContext = contentManagerMap.get(viewId, id)
  const componentChildren = map(children, child =>
    createReactComponentTree(components, child, viewId, contentManagerMap))
  const componentProps = { ...props, key: id, beagleContext }

  return createElement(BeagleId, { id, key: id }, [
    createElement(Component as FC<any>, componentProps, componentChildren),
  ])
}

export default createReactComponentTree
