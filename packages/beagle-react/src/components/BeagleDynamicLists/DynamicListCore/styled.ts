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
import { Direction } from 'common/models'

interface StyledDynamicViewsInterface {
  direction: Direction,
  useParentScroll?: boolean,
  isScrollIndicatorVisible?: boolean,
  listType?: string,
  spanCount?: number,
}

export const StyledDynamicViewsInterface = styled.div<StyledDynamicViewsInterface>`
  display: ${({ listType }) => listType === 'GRID' ? 'grid' : 'flex'};
  grid-auto-flow: ${({ direction }) => direction === 'HORIZONTAL' ? 'column' : 'row'};
  grid-template-columns: ${({ listType, spanCount, direction }) =>
    (listType === 'GRID' && spanCount && direction === 'VERTICAL') && `repeat(${spanCount}, 1fr)`};
  grid-template-rows: ${({ listType, spanCount, direction }) =>
    (listType === 'GRID' && spanCount && direction === 'HORIZONTAL') && `repeat(${spanCount}, 1fr)`};
  justify-content: ${({ listType }) => listType === 'GRID' && 'space-evenly'};
  flex-direction: ${({ direction }) => direction === 'VERTICAL' ? 'column' : 'row'};
  overflow: ${({ useParentScroll }) => useParentScroll ? 'inherit' : 'auto'};
  width: ${({ direction }) => direction === 'HORIZONTAL' ? '100%' : 'auto'};
  height: ${({ direction }) => direction === 'VERTICAL' ? '100%' : 'auto'};
  & ::-webkit-scrollbar {
    display: ${({ isScrollIndicatorVisible }) => isScrollIndicatorVisible ? 'auto' : 'none'};
  }
  -ms-overflow-style: ${({ isScrollIndicatorVisible }) => isScrollIndicatorVisible ?
    'auto' : 'none'};
  scrollbar-width: ${({ isScrollIndicatorVisible }) => isScrollIndicatorVisible ? 'auto' : 'none'};
`
