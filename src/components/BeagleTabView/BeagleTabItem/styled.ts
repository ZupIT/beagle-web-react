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

import styled from 'styled-components'
import { BeagleTheme } from '../../commons.styled'
import BeagleImage from '../../BeagleImage'

export const StyledBeagleTabItem = styled.div`
  margin: 0 5px;
`

export const StyledBeagleTabItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const StyledBeagleImage= styled(BeagleImage) `
  max-width: 80px;
  max-height: 80px;
  &:hover {
    background-color: ${BeagleTheme.swampTransparent};
  }
`
export const StyledBeagleTabItemContent = styled.div`
  display: flex;
  position: absolute;
  overflow: hidden;
  margin-top: 10px;
  left: 5px;
  width: 100%;
`

export const StyledSelected = styled.div`
  height: 2px;
  background-color: ${BeagleTheme.swamp};
`
