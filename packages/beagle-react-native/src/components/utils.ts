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

import { kebabCase } from 'lodash'

const VALID_CSS_PROPERTIES = [
  'top',
  'bottom',
  'left',
  'right',
  'start',
  'end',
  'padding',
  'paddingBottom',
  'paddingTop',
  'paddingRight',
  'paddingLeft',
  'paddingStart',
  'paddingEnd',
  'margin',
  'marginBottom',
  'marginTop',
  'marginRight',
  'marginLeft',
  'marginStart',
  'marginEnd',
  'width',
  'height',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'aspectRatio',
  'display',
  'position',
  'flexDirection',
  'flexWrap',
  'justifyContent',
  'alignItems',
  'alignSelf',
  'alignContent',
  'flexBasis',
  'flexGrow',
  'flexShrink',
  'borderRadius',
  'backgroundColor',
]

export function convertCssStylesToString(cssStyles: React.CSSProperties) {
  return Object.entries({ ...cssStyles }).map(val => `${kebabCase(val[0])}:${val[1]};`).join('')
}

export function removeInvalidCssProperties(style: Record<string, any> | React.CSSProperties): Record<string, any> {
  if(!style) return {}
  return Object.entries({ ...style })
    .filter(([key, value]) => VALID_CSS_PROPERTIES.includes(key) && !/auto|inherit/gmi.test(value))
    .map(([key, value]) => [key, value.replace(/px/gmi, '')])
    .map(([key, value]) => /^\d+$/.test(value) ? [key, Number(value)] : [key, value])
    .reduce((previous, [key, value]) => ({ ...previous, [key]: value }), {})
}