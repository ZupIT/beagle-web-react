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

import React, { FC, useEffect } from 'react'
import { BeagleAnalytics } from '@zup-it/beagle-web'
import { ScreenEvent } from '@zup-it/beagle-web/types'
import { BeagleDefaultComponent } from '../types'
import withTheme from '../utils/withTheme'
import { StyledContainer } from './styled'

export interface BeagleContainerInterface extends BeagleDefaultComponent {
  onInit?: () => void,
  screenAnalyticsEvent?: ScreenEvent,
}

const BeagleContainer: FC<BeagleContainerInterface> = props => {
  const { children, onInit, className, style, screenAnalyticsEvent } = props
  const beagleAnalytics = BeagleAnalytics.getAnalytics()

  useEffect(() => {
    if (screenAnalyticsEvent && beagleAnalytics)
      beagleAnalytics.trackEventOnScreenAppeared(screenAnalyticsEvent)
    if (onInit) onInit()
    return () => {
      if (screenAnalyticsEvent && beagleAnalytics)
        BeagleAnalytics.getAnalytics().trackEventOnScreenDisappeared(screenAnalyticsEvent)
    }
  }, [])

  return (
    <StyledContainer className={className} style={style}>
      {children}
    </StyledContainer>
  )
}

export default withTheme(BeagleContainer)
