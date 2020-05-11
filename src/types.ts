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

import { FC } from 'react'
import {
  BeagleConfig as BeagleCoreConfig,
  BeagleUIService as BeagleCoreUIService,
  DefaultSchema,
  LoadParams,
  IdentifiableBeagleUIElement,
  BeagleView,
} from '@zup-it/beagle-web'
import { UpdateWithTreeParams } from '@zup-it/beagle-web/types'

export interface BeagleConfig<Schema = DefaultSchema> extends BeagleCoreConfig<Schema> {
  components: { error: FC, loading: FC } & {
    [K in keyof Schema]: FC<Schema[K]>
  },
}

export interface BeagleUIService<Schema = DefaultSchema> extends BeagleCoreUIService<Schema> {
  getConfig: () => BeagleConfig<Schema>,
}

export interface BeagleContext<T = any> {
  replace: (params: LoadParams<T>) => Promise<void>,
  append: (params: LoadParams<T>) => Promise<void>,
  prepend: (params: LoadParams<T>) => Promise<void>,
  updateWithTree: (params: Omit<UpdateWithTreeParams<T>, 'elementId'>) => void,
  getElementId: () => string,
  getElement: () => IdentifiableBeagleUIElement<T> | null,
  getView: () => BeagleView<T>,
}

export interface BeagleComponent<T = any> {
  beagleContext: BeagleContext<T>,
}

export interface DataContext {
  id: string,
  value?: any,
}

export type NonNull = Array<number | Record<any, any> | Array<any> | string | true>

export type TextAlignment = 'left' | 'right' |'center' | 'inherit'
