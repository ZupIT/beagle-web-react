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

import { Accessibility } from 'models/accessibility'

type A11YAttr = { qualifiedName: string, value: string }

/* WARNING: If one day Beagle's BFF return more Accessibility props, please add here */
const handlers: Record<keyof Accessibility, (a11y: Accessibility) => A11YAttr | null> = {
  accessibilityLabel: ({ accessibilityLabel }) => 
    accessibilityLabel ? { value: accessibilityLabel || '', qualifiedName: 'aria-label' } : null,
  accessible: () => null,
  isHeader: ({ isHeader }) => isHeader ? { qualifiedName: 'role', value: 'heading' } : null,
}

const notAccessible: Accessibility = { accessible: false }

export const buildAccessibility = (a11y = notAccessible): Record<string, string> => {
  if (!a11y.accessible) return {}

  const keys = Object.keys(a11y) as (keyof Accessibility)[]
  return keys.reduce((result, key) => {
    const attr = handlers[key](a11y)
    return attr ? { ...result, [attr.qualifiedName]: attr.value } : result
  }, {})
}
