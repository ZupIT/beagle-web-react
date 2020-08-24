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
import { ClickEvent, ViewContentManager } from '@zup-it/beagle-web'
import BeagleServiceContext from '../../provider'
import { BeagleComponent } from '../../types'
import { BeagleDefaultComponent } from '../types'
import withTheme from '../utils/withTheme'
import { StyledButton } from './styled'

export interface BeagleButtonInterface extends BeagleDefaultComponent, BeagleComponent {
	text: string,
  onPress?: () => void,
  clickAnalyticsEvent?: ClickEvent,
}

function isSubmitButton(contentManager?: ViewContentManager) {
  if (!contentManager) return false
  const element = contentManager.getElement()
  return element.onPress && element.onPress._beagleAction_ === 'beagle:submitForm'
}

const BeagleButton: FC<BeagleButtonInterface> = ({
  text,
  className,
  onPress,
  style,
  viewContentManager,
  clickAnalyticsEvent,
}) => {
  const beagleService = useContext(BeagleServiceContext)
  const isSubmit = isSubmitButton(viewContentManager)
  const beagleAnalytics = beagleService && beagleService.analytics
  const type = isSubmit ? 'submit' : 'button'
  const handlePress = () => {
    if (clickAnalyticsEvent && beagleAnalytics)
      beagleAnalytics.trackEventOnClick(clickAnalyticsEvent)

    return isSubmit ? undefined : onPress && onPress()
  }

  return (
    <StyledButton style={style} className={className} onClick={handlePress} type={type}>
      {text}
    </StyledButton>
  )
}

export default withTheme(BeagleButton)
