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

import React, { FC } from 'react'
import { BeagleTextInterface } from 'common/models'
import { buildAccessibility } from '../../../../common/utils/accessibility'
import withTheme from '../utils/withTheme'
import { StyledText } from './styled'

const BeagleText: FC<BeagleTextInterface> = props => {
  const { text, className, textColor, alignment, style, accessibility } = props
  const a11y = buildAccessibility(accessibility)

  return (
    <StyledText 
      textColor={textColor} 
      alignment={alignment} 
      className={className} 
      style={style}
      {...a11y}>
      {text}
    </StyledText>
  )
}

export default withTheme(BeagleText)
