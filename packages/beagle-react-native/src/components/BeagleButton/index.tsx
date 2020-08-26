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
import BeagleServiceContext from 'common/provider'
import { BeagleButtonInterface } from 'common/models'
import { Text, Pressable } from 'react-native'
import { StyledView } from './styled'

const BeagleButton: FC<BeagleButtonInterface> = ({
  text,
  onPress,
  style,
  beagleContext,
  clickAnalyticsEvent,
}) => {
  const beagleService = useContext(BeagleServiceContext)
  const element = beagleContext.getElement()
  const isSubmitButton = (
    element
    && element.onPress
    && element.onPress._beagleAction_ === 'beagle:submitForm'
  )
  const beagleAnalytics = beagleService && beagleService.analytics
  const handlePress = () => {
    if (clickAnalyticsEvent && beagleAnalytics)
      beagleAnalytics.trackEventOnClick(clickAnalyticsEvent)

    return isSubmitButton ? undefined : onPress && onPress()
  }

  return (
    <Pressable onPress={handlePress} style={{ flex: 1 }}>
      <StyledView cssStyles={style}>
        <Text>{text}</Text>
      </StyledView>
    </Pressable>
  )
}

export default BeagleButton
