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

import React, { FC, useEffect } from 'react'
import { BeagleUIElement, BeagleChildren } from '@zup-it/beagle-web'
import { BeagleLazyInterface } from 'common/models'

const BeagleLazy: FC<BeagleLazyInterface> = ({ path, children, viewContentManager }) => {
  if (!viewContentManager) {
    throw new Error('Can\'t use the LazyComponent outside the context of Beagle.')
  }

  function getRelativePath() {
    return path.replace(/^([^\/])/, '/$1')
  }

  function replaceChildren(tree: BeagleUIElement) {
    const beagleView = viewContentManager!.getView()
    const anchor = viewContentManager!.getElementId()
    beagleView.getRenderer().doFullRender(tree, anchor, 'replace')
  }

  function fetchLazyView() {
    /* here we are going to use the viewClient instead of making the request ourselves to take 
    advantage of the cache system provided by Beagle */
    const beagleView = viewContentManager!.getView()
    const { urlBuilder, viewClient } = beagleView.getBeagleService()
    const url = urlBuilder.build(getRelativePath())
    viewClient.load({
      url,
      onChangeTree: replaceChildren,
      retry: fetchLazyView,
      shouldShowLoading: false,
      ...beagleView.getNetworkOptions(),
    })
  }

  useEffect(fetchLazyView, [])

  return (
    <div>
      {children}
    </div>
  )
}

BeagleChildren({ property: 'initialState' })(BeagleLazy)

export default BeagleLazy
