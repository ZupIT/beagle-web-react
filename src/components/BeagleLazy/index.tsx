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

import React, { FC, useEffect } from 'react'
import { BeagleUIElement, BeagleChildren, ErrorComponentParams } from '@zup-it/beagle-web'
import { BeagleLazyInterface } from 'models'

const BeagleLazy: FC<BeagleLazyInterface> = ({ path, children, viewContentManager }) => {
  if (!viewContentManager) {
    throw new Error('Can\'t use the LazyComponent outside the context of Beagle.')
  }

  function replaceChildren(tree: BeagleUIElement) {
    const beagleView = viewContentManager!.getView()
    const anchor = viewContentManager!.getElementId()
    beagleView.getRenderer().doFullRender(tree, anchor, 'replace')
  }

  async function fetchLazyView() {
    const beagleView = viewContentManager!.getView()
    const { viewClient } = beagleView.getBeagleService()
    try {
      const view = await viewClient.fetch({ url: path })
      replaceChildren(view)
    } catch (error) {
      const errorView: BeagleUIElement & ErrorComponentParams = {
        _beagleComponent_: 'custom:error',
        errors: [error as any],
        retry: fetchLazyView,
      }
      replaceChildren(errorView)
    }
  }

  useEffect(() => {
    fetchLazyView()
  }, [])

  return (
    <div>
      {children}
    </div>
  )
}

BeagleChildren({ property: 'initialState' })(BeagleLazy)

export default BeagleLazy
