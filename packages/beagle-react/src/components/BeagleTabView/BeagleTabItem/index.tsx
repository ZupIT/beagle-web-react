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

import React, { FC, useContext } from 'react'
import { BeagleComponent } from '../../../../../common/types'
import tabContext from '../context'
import { ImagePath } from '../../BeagleImage'
import {
  StyledBeagleTabItem,
  StyledBeagleTabItemHeader,
  StyledBeagleImage,
  StyledSelected,
  StyledBeagleTabItemContent,
} from './styled'

export interface BeagleTabItemInterface extends BeagleComponent {
  title?: string,
  icon?: ImagePath,
}

const BeagleTabItem: FC<BeagleTabItemInterface> = props => {
  const { title, icon, beagleContext, children } = props
  const id = beagleContext.getElementId()
  const componentsService = useContext(tabContext)

  return (
    <StyledBeagleTabItem>
      <StyledBeagleTabItemHeader onClick={() => componentsService.setActiveTab(id)}>
        {icon && <StyledBeagleImage path={icon} />}
        {title}
      </StyledBeagleTabItemHeader>
      {id === componentsService.activeTab &&
        <>
          <StyledSelected></StyledSelected>
          <StyledBeagleTabItemContent>
            {children}
          </StyledBeagleTabItemContent>
        </>
      }
    </StyledBeagleTabItem>
  )
}

export default BeagleTabItem
