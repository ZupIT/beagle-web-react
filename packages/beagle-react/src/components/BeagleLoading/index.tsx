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
import Spinner from '../Spinner'
import withTheme from '../utils/withTheme'
import { StyledLoading } from './styled'
import { BeagleDefaultComponent } from 'common/models'

const BeagleLoading: FC<BeagleDefaultComponent> = props => {
  const { className, style } = props

  return (
    <StyledLoading className={className} style={style}>
      <Spinner />
    </StyledLoading>
  )
}

export default withTheme(BeagleLoading)
