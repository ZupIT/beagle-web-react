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
import { ClickEvent } from '@zup-it/beagle-web'
import BeagleServiceContext from '../../../../common/provider'
import { BeagleComponent } from '../../../../common/types'
import { BeagleDefaultComponent } from '../types'
import withTheme from '../utils/withTheme'
import { StyledButton } from './styled'

export interface BeagleButtonInterface extends BeagleDefaultComponent, BeagleComponent {
	text: string,
  onPress?: () => void,
  clickAnalyticsEvent?: ClickEvent,
}

const BeagleButton: FC<BeagleButtonInterface> = ({
  text,
  className,
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
  const type = isSubmitButton ? 'submit' : 'button'
  const handlePress = () => {
    if (clickAnalyticsEvent && beagleAnalytics)
      beagleAnalytics.trackEventOnClick(clickAnalyticsEvent)

    return isSubmitButton ? undefined : onPress && onPress()
  }

  return (
    <StyledButton style={style} className={className} onClick={handlePress} type={type}>
      {text}
    </StyledButton>
  )
}

export default withTheme(BeagleButton)
