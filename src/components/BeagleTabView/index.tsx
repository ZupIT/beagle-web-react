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

import React, { FC, useState, useMemo, useEffect } from 'react'

import { BeagleComponentsProvider, TabViewContextInterface } from '../context'
import { filterBooleanArray } from '../../utils/array'
import { StyledTabView } from './styled'

export interface BeagleTabViewInterface {
  styleId?: string,
  className?: string,
}

const BeagleTabView: FC<BeagleTabViewInterface> = props => {
  const { children, styleId, className } = props
  const [activeTab, setActiveTab] = useState('')

  const validClass = filterBooleanArray([className, styleId])
  const classNames = validClass.join()
  let tabViewContext = {} as TabViewContextInterface

  const handleTabChange = (activeTab: string) => {
    if (activeTab) setActiveTab(activeTab)
  }

  tabViewContext = {
    activeTab: activeTab,
    setActiveTab: (active) => handleTabChange(active),
  }

  return (
    <BeagleComponentsProvider value={tabViewContext}>
      <StyledTabView className={classNames}>
        {children}
      </StyledTabView>
    </BeagleComponentsProvider>
  )
}

export default BeagleTabView
