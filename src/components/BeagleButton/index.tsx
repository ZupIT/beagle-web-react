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
import { BeagleDefaultComponent } from '../types'
import withTheme from '../utils/withTheme'
import { StyledButton } from './styled'

export interface BeagleButtonInterface extends BeagleDefaultComponent {
	text: string,
	onPress?: () => void,
}

const BeagleButton: FC<BeagleButtonInterface> = props => {
  const { text, className, onPress, style } = props
  return (
    <StyledButton style={style} className={className} onClick={onPress}>
      {text}
    </StyledButton>
  )
}

export default withTheme(BeagleButton)
