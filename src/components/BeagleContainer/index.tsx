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

import React, { FC, useEffect } from 'react'
import { BeagleContainerInterface } from 'models'
import withTheme from 'components/utils/withTheme'
import { buildAccessibility } from 'utils/accessibility'
import { StyledContainer } from './styled'

const BeagleContainer: FC<BeagleContainerInterface> = props => {
  const { children, onInit, className, style, accessibility, viewContentManager } = props
  const a11y = buildAccessibility(accessibility)

  useEffect(() => {
    if (onInit && !viewContentManager?.getState('hasLoaded')) {
      viewContentManager?.setState('hasLoaded', true)
      onInit()
    } 
  }, [])

  return (
    <StyledContainer 
      className={className} 
      style={style}
      aria-live="polite" 
      {...a11y}>
      {children}
    </StyledContainer>
  )
}

export default withTheme(BeagleContainer)
