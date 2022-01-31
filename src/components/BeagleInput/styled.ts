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

interface StyledTextInputInterface {
  error?: string,
  showError?: boolean,
}

export const errorColor = '#FF0000'

export const StyledInput = styled.input<StyledTextInputInterface>`
  border: ${({ error, showError }) => error && showError ? errorColor : ''};
  outline: ${({ error, showError }) => error && showError ? `auto ${errorColor}` : ''};
`
