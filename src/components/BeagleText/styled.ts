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

import styled from 'styled-components'
import { TextAlignment } from 'models'

interface StyledTextInterface {
	textColor?: string,
	alignment?: TextAlignment,
}

export const StyledText = styled.p<StyledTextInterface>`
	color: ${({ textColor }) =>  textColor ? textColor : 'inherit'};
	text-align: ${({ alignment }) => alignment ? alignment : 'inherit'};
  margin: 0;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`
