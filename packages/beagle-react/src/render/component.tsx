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

import React, { FC } from 'react'
import useBeagleUI from '../../../common/useComponent'
import { BeagleRemoteViewType } from '../../../common/types'
import createReactComponentTree from './renderer'

const BeagleRemoteView: FC<BeagleRemoteViewType> = (loadParams: BeagleRemoteViewType) => {
  const { beagleService, uiTree, viewID } = useBeagleUI(loadParams)

  const components = beagleService.getConfig().components
  const contentManagerMap = beagleService.viewContentManagerMap

  if (!uiTree || !viewID) return <></>
  return createReactComponentTree(components, uiTree, viewID, contentManagerMap)
}

export default BeagleRemoteView
