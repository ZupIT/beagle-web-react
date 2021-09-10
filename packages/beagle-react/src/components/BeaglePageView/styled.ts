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
import { BeagleTheme } from '../commons.styled'

interface StyledItemInterface {
  selected: boolean,
}

export const StyledBeaglePageView = styled.div`
  display: block;
  position: relative;
  min-height: 50px;
`

export const StyledLeftArrow = styled.span`
  position: absolute;
  top: 50%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${BeagleTheme.swamp};
  cursor: pointer;
  left: 0;
`

export const StyledRightArrow = styled.span`
  position: absolute;
  top: 50%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${BeagleTheme.swamp};
  cursor: pointer;
  right: 0;
  transform: rotateY(180deg);
`

export const StyledOrderList = styled.ol`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  align-items: center;
  justify-content: center;
`

export const StyledItemList = styled.li<StyledItemInterface>`
  width: .625rem;
  height: .625rem;
  cursor: pointer;
  border-radius: 50%;
  margin: 10px;
  background-color: ${(BeagleTheme.swamp || BeagleTheme.swampTransparent)}
`

export const StyleContentItems = styled.div`
  margin: 0 30px;
  > :not(.active) { 
    display: none; 
  }
  > .active {
    display: block;
  }
`
