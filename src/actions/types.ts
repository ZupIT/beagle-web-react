/*
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import { IdentifiableBeagleUIElement, BeagleView } from '@zup-it/beagle-web'
import { DataContext } from '../types'

type HTTPMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

export interface XHRAction {
  _actionType_: 'xhr',
  url: string,
  method?: HTTPMethod,
  data?: any,
  onSuccess?: BeagleAction,
  onError?: BeagleAction,
  onFinish?: BeagleAction,
}

export interface SetAttributeAction {
  _actionType_: 'setAttribute',
  componentId: string,
  attributeName: string,
  attributeValue: string,
}

export interface AddChildrenAction {
  _actionType_: 'addChildren',
  componentId: string,
  value: IdentifiableBeagleUIElement[],
  method?: 'append' | 'prepend',
}

export interface SetContextAction {
  _actionType_: 'setContext',
  context?: string,
  path?: string,
  value: string,
}

export interface CustomAction {
  _actionType_: string,
  [key: string]: any,
}

export type BeagleAction = (
  XHRAction
  | SetAttributeAction
  | AddChildrenAction
  | SetContextAction
  | CustomAction
)

export interface ActionHandlerParams<Action extends BeagleAction = any> {
  action: Action,
  eventContextHierarchy: DataContext[],
  element: IdentifiableBeagleUIElement,
  beagleView: BeagleView,
  handleAction: ActionHandler<BeagleAction>,
}

export type ActionHandler<Action extends BeagleAction = any> = (
  (params: ActionHandlerParams<Action>) => void
)
