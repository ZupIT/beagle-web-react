/*
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
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
import { UpdateWithTreeParams } from '@zup-it/beagle-web/dist/types'

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
