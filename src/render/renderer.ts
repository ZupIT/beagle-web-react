/*
  * Copyright 2020, 2022 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
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

import { Fragment, FC, createElement, ComponentClass } from 'react'
import { BeagleUIElement, ViewContentManagerMap } from '@zup-it/beagle-web'
import { BeagleConfig } from 'types'
import { getComponentByCaseInsensitiveKey } from 'utils/beagleComponent'

const createReactComponentTree = <Schema>(
  components: BeagleConfig<Schema>['components'],
  ui: BeagleUIElement<Schema>,
  viewId: string,
  contentManagerMap: ViewContentManagerMap,
  BeagleId: FC<{ id: string }> | ComponentClass<{ id: string }>
): JSX.Element => {
  /* the property "key" is not allowed in React. Since this is not a rule for Beagle, every time
  Beagle receives "key", it transforms it into "_key" */
  if (ui.key) {
    ui._key = ui.key
    delete ui.key
  }

  const { _beagleComponent_, children, id, context, ...props } = ui
  
  if (!_beagleComponent_) return createElement(Fragment)

  const Component = getComponentByCaseInsensitiveKey(components, _beagleComponent_)

  if (!Component) {
    console.error(
      `Error: Beagle could not find component ${_beagleComponent_ as string}. This component and its children won't be rendered.`
    )
    return createElement(Fragment)
  }

  function beagleComponentAsReactComponent(beagleComponent: BeagleUIElement<Schema>) {
    return createReactComponentTree(
      components,
      beagleComponent,
      viewId,
      contentManagerMap,
      BeagleId,
    )
  }

  const viewContentManager = contentManagerMap.get(viewId, id)
  const componentChildren = children ? children.map(beagleComponentAsReactComponent) : []
  const componentProps = { ...props, key: id, viewContentManager }

  return createElement(BeagleId, { id, key: id }, [
    createElement(Component as FC<any>, componentProps, componentChildren),
  ])
}

export default createReactComponentTree
