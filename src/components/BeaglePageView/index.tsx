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
import { BeagleDefaultComponent, PageIndicatorInterface } from '../types'
import {
  StyledBeaglePageView, StyledLeftArrow, StyleContentItems,
  StyledRightArrow, StyledItemList, StyledOrderList,
} from './styled'
import { KeyBoardArrow } from './KeyboardArrowLeft'

export interface BeaglePageViewInterface extends BeagleDefaultComponent {
  /**
   * @deprecated Since version 1.1. Will be deleted in version 2.0.
   * Use pageIndicator as a component instead.
  */
  pageIndicator?: PageIndicatorInterface,
  onPageChange?: (index: number) => void,
  currentPage?: number,
}

const BeaglePageView: FC<BeaglePageViewInterface> = ({
  children, onPageChange, currentPage, 
  /**
   * @deprecated Since version 1.1. Will be deleted in version 2.0.
   * Use pageIndicator as a component instead.
  */
  pageIndicator,
}) => {
  const [active, setActive] = useState(currentPage || 0)
  const numberChildren = Children.count(children)

  useEffect(() => {
    if (pageIndicator)
      console.log(`The page view you are using is deprecated. 
      This will be removed in a future version; please refactor this component 
      using new context features.`)
  }, [])

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

  const bullets = pageIndicator ? (
    <StyledOrderList>
      {
        Children.map(children, (child, index) => (
          <StyledItemList onClick={() => setActive(index)} selected={index === active}
            pageIndicator={pageIndicator}>
          </StyledItemList>
        ))
      }
    </StyledOrderList>
  ) : null

  return (
    <StyledBeaglePageView>
      <StyledLeftArrow onClick={backSlide} >
        <KeyBoardArrow />
      </StyledLeftArrow>

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

      <StyledRightArrow onClick={nextSlide}>
        <KeyBoardArrow />
      </StyledRightArrow>
      {bullets}
    </StyledBeaglePageView>
  )
}

export default BeaglePageView
