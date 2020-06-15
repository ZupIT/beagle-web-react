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

import React, {
  FC, useState,
  cloneElement, Children, isValidElement, ReactNode,
} from 'react'
import { BeagleDefaultComponent, PageIndicator } from '../types'
import {
  StyledBeaglePageView, StyledLeftArrow, StyleContentItens,
  StyledRightArrow, StyledItemList, StyledOrderList,
} from './styled'
import { KeyBoardArrow } from './KeyboardArrowLeft'

export interface BeaglePageViewInterface extends BeagleDefaultComponent {
  pageIndicator?: PageIndicator,
}

const BeaglePageView: FC<BeaglePageViewInterface> = props => {
  const { children, pageIndicator } = props
  const [active, setActive] = useState(0)

  const numberChildren = Children.count(children)

  const backSlide = () => {
    if (active > 0) setActive(active - 1)
  }

  const nextSlide = () => {
    if (active < numberChildren - 1) setActive(active + 1)
  }

  return (
    <StyledBeaglePageView>
      <StyledLeftArrow onClick={backSlide} >
        <KeyBoardArrow />
      </StyledLeftArrow>
      <StyleContentItens>
        {
          Children.map(children, (childId, index) => {
            if (index === active && isValidElement(childId) && childId.props &&
            childId.props.children) {
              const item: ReactNode = childId.props.children
              const childrenItens = item && Children.map(item, (child) => (
                isValidElement(child)) ? cloneElement(child, { className: 'active' }) : child)
              return childrenItens
            } else 
              return childId
          })
        }
      </StyleContentItens>
      <StyledRightArrow onClick={nextSlide}>
        <KeyBoardArrow />
      </StyledRightArrow>

      <StyledOrderList>
        {
          Children.map(children, (child, index) => (
            <StyledItemList onClick={() => setActive(index)} selected={index === active}
              pageIndicator={pageIndicator}>
            </StyledItemList>
          ))
        }
      </StyledOrderList>
    </StyledBeaglePageView>
  )
}

export default BeaglePageView
