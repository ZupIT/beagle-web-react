import React, { FC } from 'react'
import { BeagleComponent } from '@zup-it/beagle-react'
import {
  StyledTabBar,
  StyledBeagleTabItem,
  StyledBeagleTabItemContent,
  StyledSelected,
} from './styled'

export interface ItemTitle {
  title?: string,
  icon?: ImagePath,
}

export interface ImagePath {
  _beagleImagePath_: 'local' | 'remote',
  url: string,
}

export interface BeagleTabBarInterface extends BeagleComponent {
  onTabSelection?: (item: number) => void,
  currentTab?: number,
  items: ItemTitle[],
  styleId?: string,
}

const BeagleTabBar: FC<BeagleTabBarInterface> = ({
  onTabSelection, currentTab, items, beagleContext, styleId,
}) => {

  const changeSelectedTab = (index: number) => {
    if (!onTabSelection) return
    onTabSelection(index)
  }

  return (
    <StyledTabBar className={styleId}>
      {items.map((item, index) => (
        <StyledBeagleTabItem key={index}>
          <StyledBeagleTabItemContent onClick={() => changeSelectedTab(index)}>
          
            {item.title}
          </StyledBeagleTabItemContent >
          {index === currentTab && <StyledSelected></StyledSelected>}
        </StyledBeagleTabItem>
      ))}
    </StyledTabBar>
  )
}

export default BeagleTabBar