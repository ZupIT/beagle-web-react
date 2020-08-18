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
import { ClickEvent } from '@zup-it/beagle-web/types'
import BeagleServiceContext from '../../../../common/provider'
import { BeagleDefaultComponent } from '../types'
import withTheme from '../utils/withTheme'
import { StyledBeagleTouchable } from './styled'

export interface BeagleTouchableInterface extends BeagleDefaultComponent {
  onPress: () => void,
  clickAnalyticsEvent?: ClickEvent,
}

const BeagleTouchable: FC<BeagleTouchableInterface> = ({ 
  onPress,
  clickAnalyticsEvent,
  className,
  style,
  children,
}) => {
  const beagleService = useContext(BeagleServiceContext)
  const beagleAnalytics = beagleService && beagleService.analytics
  const handlePress = () => {
    if (clickAnalyticsEvent && beagleAnalytics)
      beagleAnalytics.trackEventOnClick(clickAnalyticsEvent)
    return onPress && onPress()
  }
  
  return (
    <StyledBeagleTouchable className={className} onClick={handlePress} style={style}>
      {children}
    </StyledBeagleTouchable>
  )
}

export default withTheme(BeagleTouchable)
