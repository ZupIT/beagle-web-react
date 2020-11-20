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

import { FC, MutableRefObject } from 'react'
import {
  BeagleConfig as BeagleCoreConfig,
  BeagleService as BeagleCoreService,
  DefaultSchema,
  DataContext,
  ErrorComponentParams,
  ViewContentManager as CoreViewContentManager,
  BeagleView,
  HttpMethod,
  Strategy,
  BeagleUIElement,
  NetworkOptions,
} from '@zup-it/beagle-web'

export interface BeagleConfig<Schema = DefaultSchema>
  extends Omit<BeagleCoreConfig<Schema>, 'platform'> {
  components: {
    'custom:error'?: FC<{}> | FC<ErrorComponentParams>,
    'custom:loading'?: FC<{}>,
  } & {
    [K in keyof Schema]: FC<Schema[K]>
  },
}

export interface BeagleConfigReactNative<Schema = DefaultSchema> extends BeagleConfig<Schema> {
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

// todo: legacy type. Remove for v2.0.
export interface LegacyLoadParams {
  /**
   * @deprecated since v1.3. Will be removed in 2.0.
   */
  path?: string,
  /**
   * @deprecated since v1.3. Will be removed in 2.0.
   */
  fallback?: BeagleUIElement,
  /**
   * @deprecated since v1.3. Will be removed in 2.0.
   */
  method?: HttpMethod,
  /**
   * @deprecated
   */
  headers?: Record<string, string>,
  /**
   * @deprecated since v1.3. Will be removed in 2.0.
   */
  shouldShowLoading?: boolean,
  /**
   * @deprecated since v1.3. Will be removed in 2.0.
   */
  shouldShowError?: boolean,
  /**
   * @deprecated since v1.3. Will be removed in 2.0.
   */
  strategy?: Strategy,
  /**
   * @deprecated
   */
  loadingComponent?: string,
  /**
   * @deprecated since v1.3. Will be removed in 2.0.
   */
  errorComponent?: string,
}

// todo: remove the "extends" for v2.0.
export interface BeagleRemoteViewType extends LegacyLoadParams {
  /**
   * the id of this beagle view. Will be assigned a random id if none is provided.
   */
  id?: string,
  /**
   * React ref to attach a reference to the BeagleView to. Useful for manipulating the BeagleView
   * manually.
   */
  viewRef?: MutableRefObject<BeagleView | undefined>,
  /**
   * The initial route to navigate the BeagleView to. If this property changes, the navigation
   * history is reseted and the view is navigated to the new route. If you need to specify headers
   * or the http method, you should take a look into navigation controllers or custom http clients,
   * both can be set in the configuration for the Beagle Service.
   */
  route?: string,
  /**
   * The options to perform http requests (http method, headers and cache strategy) for all
   * navigations in this BeagleView. If not specified, will use the default options.
   */
  networkOptions?: NetworkOptions,
  /**
   * Tells which navigation controller to use until a new one is declared. The navigation controller
   * is responsible for the visual feedback of a navigation: the loading and error components, for
   * instance. This property is useful to setup the first request, which is not controlled by the
   * backend.
   */
  controllerId?: string,
}
