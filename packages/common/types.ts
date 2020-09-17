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
  LoadParams,
  BeagleView,
} from '@zup-it/beagle-web'

export interface BeagleConfig<Schema = DefaultSchema> extends BeagleCoreConfig<Schema> {
  components: {
    'custom:error'?: FC<{}> | FC<ErrorComponentParams>,
    'custom:loading'?: FC<{}>,
  } & {
    [K in keyof Schema]: FC<Schema[K]>
  }
}

export interface BeagleConfigReactNative<Schema = DefaultSchema> extends BeagleConfig<Schema>{
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

export interface BeagleRemoteViewType extends LoadParams {
  id?: string,
  viewRef?: MutableRefObject<BeagleView | undefined>,
  onCreateBeagleView?: (view: BeagleView) => void,
}
