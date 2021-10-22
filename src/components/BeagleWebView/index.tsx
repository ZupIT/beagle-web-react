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
import { BeagleWebViewInterface } from 'models'
import { buildAccessibility } from 'utils/accessibility'
import withTheme from 'components/utils/withTheme'
import { StyledWebView } from './styled'

const BeagleWebView: FC<BeagleWebViewInterface> = props => {
  const { url, className, style, accessibility } = props
  const a11y = buildAccessibility(accessibility)

  return (
    <StyledWebView 
      className={className} 
      style={style} 
      src={url}
      {...a11y}>
    </StyledWebView>
  )
}

export default withTheme(BeagleWebView)
