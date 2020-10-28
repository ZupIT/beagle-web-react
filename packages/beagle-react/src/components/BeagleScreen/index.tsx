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

import React, { FC, useEffect, useContext } from 'react'
import BeagleServiceContext from 'common/provider'
import { BeagleScreenInterface } from 'common/models'
import { StyledScreen } from './styled'

const BeagleScreen: FC<BeagleScreenInterface> = props => {
  const beagleService = useContext(BeagleServiceContext)
  const { children, screenAnalyticsEvent } = props
  const beagleAnalytics = beagleService && beagleService.analytics

  useEffect(() => {
    if (screenAnalyticsEvent && beagleAnalytics)
      beagleAnalytics.trackEventOnScreenAppeared(screenAnalyticsEvent)
    return () => {
      if (screenAnalyticsEvent && beagleAnalytics)
        beagleAnalytics.trackEventOnScreenDisappeared(screenAnalyticsEvent)
    }
  }, [])

  return (
    <StyledScreen>
      {children}
    </StyledScreen>
  )
}

export default BeagleScreen
