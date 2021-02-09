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

/* WARNING: If one day Beagle's BFF return more Accessibility props, please add here */
export const buildAccessibility = (a11y?: Accessibility): Record<string, string> => {
  let accessibilityProps: Record<string, string> = {}

  if (a11y && a11y.accessible) {
    accessibilityProps = {
      ...(a11y.accessibilityLabel ? { 'aria-label': a11y.accessibilityLabel } : {}),
      ...(a11y.isHeader ? { 'role': 'heading' } : {}),
    }
  }

  return accessibilityProps
}
