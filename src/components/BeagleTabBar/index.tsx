import React, { FC } from 'react'
import { BeagleComponent } from '@zup-it/beagle-react'
import {StyledTabImage} from './styled'

import {
  StyledTabBar,
  StyledBeagleTabItem,
  StyledBeagleTabItemContent
} from './styled'

export interface ItemTitle {
  title?: string
}

export interface ImagePath {
  _beagleImagePath_: 'local' | 'remote',
  url: string,
}

export interface BeagleTabBarInterface extends BeagleComponent {
  onTabSelection?: (item: number) => void,
  currentTab?: number,
  items: ItemTitle[],
  styleId?: string
}

const BeagleTabBar: FC<BeagleTabBarInterface> = ({
  onTabSelection, currentTab, items, styleId,
}) => {

  const changeSelectedTab = (index: number) => {
    if (!onTabSelection) return
    onTabSelection(index)
  }

  return (
    <StyledTabBar className={styleId}>
      {items.map((item, index) => (
        <StyledBeagleTabItem  index={index} isActive={index === currentTab} key={index} onClick={() => changeSelectedTab(index)}>
          <StyledBeagleTabItemContent>{item.title}</StyledBeagleTabItemContent >
        </StyledBeagleTabItem>
      ))}
      
    </StyledTabBar>



  )
}

export default BeagleTabBar