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

import React, { FC, useState, useEffect } from 'react'
import { BeforeViewSnapshot } from '@zup-it/beagle-web'
import withTheme from '../utils/withTheme'
import { BeagleDefaultComponent } from '../types'
import { BeagleComponentsProvider } from './context'
import { StyledTabView } from './styled'
import { transformItems } from './lifecycles'

export interface BeagleChildren {
  key: string,
}

/**
 * @deprecated Since version 1.1. Will be deleted in version 2.0.
 * Consider replacing this component for a tabBar with a pageview.
*/
const BeagleTabView: FC<BeagleDefaultComponent> = props => {
  const { children, className } = props

  const [activeTab, setActiveTab] = useState('')
  
  const tabViewContext = {
    activeTab: activeTab,
    setActiveTab: (active: string) => setActiveTab(active),
  }

  useEffect(() => {
    // @ts-ignore
    console.log('=>', JSON.stringify(props.viewContentManager.getView().getTree(), null, 2))
    if (children && Array.isArray(children) && children[0]) {
      const firstChildren = children[0] as BeagleChildren
      tabViewContext.setActiveTab(firstChildren.key)
    }
    console.warn(`Tabview is deprecated. This will be removed in a future version.
    Please consider replacing this component for a tabBar with a pageview.`)
  }, [])

  return (
    <BeagleComponentsProvider value={tabViewContext}>
      <StyledTabView className={className}>
        {children}
      </StyledTabView>
    </BeagleComponentsProvider>
  )
}

const TabViewWithTheme = withTheme(BeagleTabView)
BeforeViewSnapshot(transformItems)(TabViewWithTheme)

export default TabViewWithTheme
