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

import { BeagleUIElement } from '@zup-it/beagle-web'
import { BeagleComponent } from '../../types'
import { Direction, BeagleDefaultComponent } from '../types'

export type NodeType = HTMLElement | null

export interface BeagleListViewInterface extends BeagleDefaultComponent, BeagleComponent {
  direction: Direction,
  dataSource: any[],
  iteratorName?: string,
  onInit?: () => void,
  onScrollEnd?: () => void,
  scrollEndThreshold?: number,
  template: BeagleUIElement,
  useParentScroll?: boolean,
  /* the property "key" is not allowed in React. Since this is not a rule for Beagle, every time
  Beagle receives "key", it transforms it into "_key" */
  _key?: string,
  __suffix__?: string,
}

export interface ScrollInterface {
  direction: Direction,
  onScrollEnd?: () => void,
  scrollEndThreshold: number,
  useParentScroll: boolean,
  elementRef: React.MutableRefObject<HTMLDivElement>,
  hasRendered: boolean,
}
