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

import React, { FC, Children } from 'react'
import { PageIndicatorInterface } from 'common/models'
import { StyledItemList, StyledOrderList } from './styled'

const BeaglePageIndicator: FC<PageIndicatorInterface> = ({
  selectedColor, unselectedColor, numberOfPages, currentPage, 
}) => {

  const totalPages = numberOfPages ? Array(numberOfPages) : []

  const isSelected = (index: number): boolean => index === currentPage

  return (
    <StyledOrderList>
      {
        Children.map(totalPages, (child, index) => (
          <StyledItemList 
            key={index} 
            selected={isSelected(index)}
            selectedColor={selectedColor} 
            unselectedColor={unselectedColor}
            aria-colindex={index}
            aria-posinset={index + 1}
            aria-selected={isSelected(index)}>
          </StyledItemList>
        ))
      }
    </StyledOrderList>
  )
}

export default BeaglePageIndicator
