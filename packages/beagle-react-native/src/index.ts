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

import createBeagleCoreUIService, { DefaultSchema, ErrorComponentParams } from '@zup-it/beagle-web'
import { BeagleUIService, BeagleComponent, BeagleConfigReactNative } from 'common/types'
import { BeagleProvider } from 'common/provider'
import { translateStyles } from 'lifecycles/translateStyles'
import BeagleRemoteView from './render/component'
import defaultComponents from './components/index'
import { createVolatileStorage } from './volatile-storage'

function createBeagleUIService<Schema = DefaultSchema>(config: BeagleConfigReactNative<Schema>) {
  return createBeagleCoreUIService<Schema, BeagleConfigReactNative<Schema>>({
    ...config,
    components: {
      ...config.components,
      ...defaultComponents,
    },
    platform: 'React Native',
    customStorage: config.customStorage || createVolatileStorage(),
    localAssetsPath: config.localAssetsPath || {},
    lifecycles: {
      ...config.lifecycles,
      beforeRender: (uiTree) => {
        translateStyles(uiTree)
        if (config.lifecycles?.beforeRender) config.lifecycles.beforeRender(uiTree)
      },
    },
  })
}

export {
  createBeagleUIService,
  BeagleRemoteView,
  BeagleProvider,
  BeagleConfigReactNative,
  BeagleUIService,
  BeagleComponent,
  ErrorComponentParams,
}
