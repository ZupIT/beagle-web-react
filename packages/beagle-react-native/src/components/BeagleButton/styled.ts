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

import styled from 'styled-components/native'
import { convertCssStylesToString } from '../utils'
import { BeagleTheme } from '../../../../common/utils/commons.styled'

interface StyledButtonInterface {
  cssStyles?: React.CSSProperties
}

export const StyledView = styled.View<StyledButtonInterface>`
border: 1px solid ${BeagleTheme.swampLight};
line-height: 40px;
min-height: 50px
background: transparent;
display: flex;
text-align: center;
margin: 5px;
padding: 0 16px;
border-radius: 5px;
color: #FFFFFF;
justify-content: center
align-items: center
${({ cssStyles }) => cssStyles ? convertCssStylesToString(cssStyles) : ''};
`