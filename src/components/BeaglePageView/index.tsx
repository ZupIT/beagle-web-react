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
  FC, useEffect, useState,
  cloneElement, Children, isValidElement,
} from 'react'
import { BeagleDefaultComponent, PageIndicator } from '../types'
import {
  StyledBeaglePageView, StyledLeftArrow, StyleContentItens,
  StyledRightArrow, StyledItemList, StyledOrderList,
} from './styled'

export interface BeaglePageViewInterface extends BeagleDefaultComponent {
  pageIndicator?: PageIndicator,
}

export interface BeagleChildren {
  key: string,
}

const BeaglePageView: FC<BeaglePageViewInterface> = props => {
  const { children, pageIndicator } = props
  const [active, setActive] = useState(0)
  let numberChildren = 0

  const backSlide = () => {
    if (active > 0) setActive(active - 1)
  }

  const nextSlide = () => {
    if (active < numberChildren - 1) setActive(active + 1)
  }

  useEffect(() => {
    if (children && Array.isArray(children)) numberChildren = children.length
  }, [])

  return (
    <StyledBeaglePageView>
      <StyledLeftArrow onClick={backSlide} />
      <StyleContentItens>
        {
          Children.map(children, (child, index) => (
            (isValidElement(child) && index === active) ? cloneElement(child, { className: 'active' }) : child
          ))
        }
      </StyleContentItens>
      <StyledRightArrow onClick={nextSlide} />

      <StyledOrderList>
        {
          Children.map(children, (child, index) => (
            <StyledItemList selected={index === active} pageIndicator={pageIndicator}></StyledItemList>
          ))
        }
      </StyledOrderList>
    </StyledBeaglePageView>
  )
}

export default BeaglePageView
