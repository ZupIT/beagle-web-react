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
import { BeagleContainerInterface } from 'common/models'
import { View } from 'react-native'
import BeagleServiceContext from 'common/provider'

const BeagleContainer: FC<BeagleContainerInterface> = props => {
  const beagleService = useContext(BeagleServiceContext)
  const { children, style, onInit, screenAnalyticsEvent } = props
  const beagleAnalytics = beagleService && beagleService.analytics

  useEffect(() => {
    if (screenAnalyticsEvent && beagleAnalytics)
      beagleAnalytics.trackEventOnScreenAppeared(screenAnalyticsEvent)
    if (onInit) onInit()
    return () => {
      if (screenAnalyticsEvent && beagleAnalytics)
        beagleAnalytics.trackEventOnScreenDisappeared(screenAnalyticsEvent)
    }
  }, [])

  return <View style={style}>{children}</View>
}

export default BeagleContainer
