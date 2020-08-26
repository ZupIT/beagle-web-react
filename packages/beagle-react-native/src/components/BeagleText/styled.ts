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
import { TextAlignment, MobileAlignment } from 'common/models'
import { convertCssStylesToString } from '../utils'

interface StyledTextInterface {
  textColor?: string,
  alignment?: TextAlignment,
  cssStyles?: React.CSSProperties,
}

const alignMap: Record<string, MobileAlignment> = {
  auto: 'auto',
  center: 'center',
  left: 'left',
  right: 'right',
}

export const StyledText = styled.Text<StyledTextInterface>`
color: ${({ textColor }) => textColor ? textColor : '#000000'};
text-align: ${({ alignment }) => alignment && alignment != 'INHERIT' ?
    alignMap[alignment.toLowerCase()] :
    'auto'};
${({ cssStyles }) => cssStyles ? convertCssStylesToString(cssStyles) : ''};
`
