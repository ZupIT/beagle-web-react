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
  cloneElement, Children, isValidElement, ReactNode, useEffect,
} from 'react'
import { BeaglePageViewInterface } from 'common/models'
import {
  StyledBeaglePageView, StyledLeftArrow, StyleContentItems,
  StyledRightArrow, StyledItemList, StyledOrderList,
} from './styled'
import { KeyBoardArrow } from './KeyboardArrowLeft'


const BeaglePageView: FC<BeaglePageViewInterface> = ({
  children, onPageChange, currentPage, showArrow,
}) => {
  const [active, setActive] = useState(currentPage || 0)
  const numberChildren = Children.count(children)

  showArrow = showArrow !== undefined ? showArrow : true

  useEffect(() => {
    if (currentPage !== undefined && currentPage !== active)
      setActive(currentPage)
  }, [currentPage])

  const updatePage = (newPageIndex: number) => {
    if (onPageChange) onPageChange(newPageIndex)
    setActive(newPageIndex)
  }

  const backSlide = () => {
    if (active > 0) updatePage(active - 1)
  }

  const nextSlide = () => {
    if (active < numberChildren - 1)
      updatePage(active + 1)
  }

  const rightArrow = showArrow ? (
    <StyledRightArrow onClick={nextSlide}>
      <KeyBoardArrow />
    </StyledRightArrow>
  ) : null

  const leftArrow = showArrow ? (
    <StyledLeftArrow onClick={backSlide} >
      <KeyBoardArrow />
    </StyledLeftArrow>
  ) : null

  return (
    <StyledBeaglePageView>
      {leftArrow}
      <StyleContentItems>
        {
          Children.map(children, (childId, index) => {
            if (
              index === active
              && isValidElement(childId)
              && childId.props
              && childId.props.children
            ) {
              const item: ReactNode = childId.props.children
              const childrenItems = item && Children.map(item, (child) => (
                isValidElement(child)) ? cloneElement(child, { className: 'active' }) : child)
              return childrenItems
            }
            return childId
          })
        }
      </StyleContentItems>
      {rightArrow}
    </StyledBeaglePageView>
  )
}

export default BeaglePageView
