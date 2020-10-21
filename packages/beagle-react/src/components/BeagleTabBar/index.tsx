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

import React, { FC } from 'react'
import { BeagleTabBarInterface, ImagePath } from 'common/models'
import withTheme from '../utils/withTheme'
import {
  StyledTabBar,
  StyledBeagleTabItem,
  StyledBeagleTabItemContent,
  StyledBeagleImage,
  StyledSelected,
} from './styled'

export interface ItemTitle {
  title?: string,
  icon?: ImagePath,
}


const BeagleTabBar: FC<BeagleTabBarInterface> = ({ onTabSelection, currentTab, items }) => {
  const changeSelectedTab = (index: number) => {
    if (!onTabSelection) return
    onTabSelection(index)
  }

  const tabImage = (item: ItemTitle) => item.icon ? (
    <StyledBeagleImage path={item.icon}></StyledBeagleImage>
  ) : null

  return (
    <StyledTabBar>
      {items.map((item, index) => (
        <StyledBeagleTabItem key={index}>
          <StyledBeagleTabItemContent
            aria-label={item.title}
            onClick={() => changeSelectedTab(index)}
          >
            {tabImage(item)}
            {item.title}
          </StyledBeagleTabItemContent >
          {index === currentTab &&
            <StyledSelected aria-label={`${item.title} is the current Tab`}></StyledSelected>
          }
        </StyledBeagleTabItem>
      ))}
    </StyledTabBar>
  )
}

export default withTheme(BeagleTabBar)
