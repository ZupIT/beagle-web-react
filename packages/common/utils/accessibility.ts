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

import { Accessibility } from '../models/accessibility'

type A11YAttr = { qualifiedName: string, value: string }

/* WARNING: If one day Beagle's BFF return more Accessibility props, please add here */
export const buildAccessibility = (a11y?: Accessibility): Record<string, string> => {
  let accessibilityProps: Record<string, string> = {}
  const ariaMap: Record<string, string | A11YAttr> = {
    accessibilityLabel: 'aria-label',
    isHeader: {
      qualifiedName: 'role',
      value: 'heading',
    },
  }

  if (a11y && a11y.accessible) {
    const keys = Object.keys(a11y).filter(k => k !== 'accessible')
    for (const key of keys) {
      if (a11y[key]) {
        let qualifiedName: string, value: string
        const mapped = ariaMap[key]

        if (mapped) {
          if ((mapped as A11YAttr).qualifiedName) {
            qualifiedName = (mapped as A11YAttr).qualifiedName
            value = (mapped as A11YAttr).value
          } else {
            qualifiedName = mapped as string
            value = a11y[key] as string
          }

          accessibilityProps = {
            ...accessibilityProps,
            [qualifiedName]: value,
          }
        }
      }
    }
  }

  return accessibilityProps
}
