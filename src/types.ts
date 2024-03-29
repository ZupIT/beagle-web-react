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

import { FC } from 'react'
import {
  BeagleConfig as BeagleCoreConfig,
  BeagleService as BeagleCoreService,
  DefaultSchema,
  DataContext,
  ErrorComponentParams,
  ViewContentManager as CoreViewContentManager,
  RemoteView,
} from '@zup-it/beagle-web'
import { Omit } from '@zup-it/beagle-web/types'

export type Config<Schema> = Omit<BeagleCoreConfig<Schema>, 'platform'>

export interface BeagleConfig<Schema = DefaultSchema> extends Config<Schema> {
  components: {
    'custom:error'?: FC<{}> | FC<ErrorComponentParams>,
    'custom:loading'?: FC<{}>,
  } & {
    [K in keyof Schema]: FC<Schema[K]>
  },
}

export interface BeagleConfigReactNative<Schema = DefaultSchema> extends Config<Schema> {
  platform?: string | undefined,
  localAssetsPath?: Record<string, number>,
}

export interface BeagleUIService<Schema = DefaultSchema> extends BeagleCoreService {
  getConfig: () => BeagleConfig<Schema>,
}

export interface BeagleUIReactNativeService<Schema = DefaultSchema> extends BeagleCoreService {
  getConfig: () => BeagleConfigReactNative<Schema>,
}

export type ViewContentManager = CoreViewContentManager

export interface BeagleComponent {
  viewContentManager?: ViewContentManager,
}

export { DataContext }

export type NonNull = Array<number | Record<any, any> | Array<any> | string | true>

export interface BeagleRemoteViewType {
  /**
   * The initial route to navigate the BeagleView to. If this property changes, the navigation
   * history is reseted and the view is navigated to the new route. If you need to specify headers
   * or the http method, you should take a look into navigation controllers or custom http clients,
   * both can be set in the configuration for the Beagle Service.
   */
  route: string | RemoteView,
  /**
   * Tells which navigation controller to use until a new one is declared. The navigation controller
   * is responsible for the visual feedback of a navigation: the loading and error components, for
   * instance. This property is useful to setup the first request, which is not controlled by the
   * backend.
   */
  controllerId?: string,
}
