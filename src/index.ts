/*
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import createBeagleCoreUIService, { DefaultSchema } from '@zup-it/beagle-web'
import { ActionHandler, CustomAction } from './actions/types'
import BeagleRemoteView from './component'
import { BeagleProvider } from './provider'
import { BeagleConfig, BeagleUIService, BeagleComponent } from './types'

function createBeagleUIService<Schema = DefaultSchema>(config: BeagleConfig<Schema>) {
  return createBeagleCoreUIService<Schema>(config)
}

export {
  createBeagleUIService,
  BeagleRemoteView,
  BeagleProvider,
  BeagleConfig,
  BeagleUIService,
  BeagleComponent,
  ActionHandler,
  CustomAction,
}
