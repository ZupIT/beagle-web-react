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

import React, { FC, useContext, useState } from 'react'
import BeagleServiceContext from 'common/provider'
import { BeagleTouchableInterface } from 'common/models'
import { buildAccessibility } from '../../../../common/utils/accessibility'
import withTheme from '../utils/withTheme'
import { StyledBeagleTouchable } from './styled'

const BeagleTouchable: FC<BeagleTouchableInterface> = ({ 
  onPress,
  clickAnalyticsEvent,
  className,
  style,
  children,
  accessibility,
}) => {
  const a11y = buildAccessibility(accessibility)
  const beagleService = useContext(BeagleServiceContext)
  const [pressed, setPressed] = useState(false)
  const beagleAnalytics = beagleService && beagleService.analytics
  
  const handlePress = () => {
    setPressed(false)

    if (clickAnalyticsEvent && beagleAnalytics)
      beagleAnalytics.trackEventOnClick(clickAnalyticsEvent)
    return onPress && onPress()
  }
  
  return (
    <StyledBeagleTouchable 
      className={className}
      onMouseDown={e => setPressed(true)} 
      onClick={handlePress} 
      style={style}
      aria-pressed={pressed}
      {...a11y}>
      {children}
    </StyledBeagleTouchable>
  )
}

export default withTheme(BeagleTouchable)
