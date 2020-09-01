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
import { Direction, BeagleDefaultComponent } from '../types'
import withTheme from '../utils/withTheme'
import { StyledListView } from './styled'
  
export interface BeagleListViewInterface extends BeagleDefaultComponent {
  direction: Direction,
}

const BeagleListView: FC<BeagleListViewInterface> = props => {
  const { children, direction, className, style } = props

  return (
    <StyledListView className={className} direction={direction} style={style}>
      {children}
    </StyledListView>
  )
}

export default withTheme(BeagleListView)