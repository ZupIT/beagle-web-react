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

import { ChangeEvent, FocusEvent } from 'react'

export type TextAlignment = 'LEFT' | 'CENTER' | 'RIGHT' | 'INHERIT'

export type Direction =  'VERTICAL' | 'HORIZONTAL'

export type ImageMode = 'FIT_XY' | 'FIT_CENTER' | 'CENTER_CROP' | 'CENTER'

export interface PageIndicatorInterface {
  selectedColor?: string,
  unselectedColor?: string,
  numberOfPages?: number,
  currentPage?: number,
}

export type InputHandler = (event: { value: string }) => void

type InputElement = HTMLTextAreaElement | HTMLInputElement

export type InputType = 'DATE' | 'EMAIL' | 'PASSWORD' | 'NUMBER' | 'TEXT'

export type InputEvent = ChangeEvent<InputElement> | FocusEvent<InputElement>

export interface BeagleDefaultComponent {
  style?: React.CSSProperties,
  className?: string,
}
