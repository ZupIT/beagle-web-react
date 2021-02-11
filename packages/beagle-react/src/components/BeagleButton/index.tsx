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
import { ViewContentManager } from '@zup-it/beagle-web'
import BeagleServiceContext from 'common/provider'
import { BeagleButtonInterface } from 'common/models'
import withTheme from '../utils/withTheme'
import { buildAccessibility } from '../../../../common/utils/accessibility'
import { StyledButton } from './styled'

function isSubmitButton(contentManager?: ViewContentManager) {
  if (!contentManager) return false
  const element = contentManager.getElement()
  let isSubmit = false
  if (element.onPress){
    isSubmit = Array.isArray(element.onPress) ?
      element.onPress.filter(
        el => el._beagleAction_.toLowerCase() === 'beagle:submitform').length > 0 :
      element.onPress._beagleAction_.toLowerCase() === 'beagle:submitform'
  }
  return isSubmit
}

const BeagleButton: FC<BeagleButtonInterface> = ({
  text,
  className,
  onPress,
  style,
  viewContentManager,
  clickAnalyticsEvent,
  enabled,
  accessibility,
}) => {
  const [pressed, setPressed] = useState(false)
  const a11y = buildAccessibility(accessibility)
  const beagleService = useContext(BeagleServiceContext)
  const isSubmit = isSubmitButton(viewContentManager)
  const beagleAnalytics = beagleService && beagleService.analytics
  const type = isSubmit ? 'submit' : 'button'  
  const isDisabled = enabled === undefined ? false : !enabled

  const handlePress = () => {
    setPressed(false)

    if (clickAnalyticsEvent && beagleAnalytics)
      beagleAnalytics.trackEventOnClick(clickAnalyticsEvent)

    return isSubmit ? undefined : onPress && onPress()
  }

  return (
    <StyledButton
      style={style}
      className={className}
      onMouseDown={() => setPressed(true)} 
      onClick={handlePress}
      type={type}
      role="button"      
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-pressed={pressed}
      {...a11y}
    >
      {text}
    </StyledButton>
  )
}

export default withTheme(BeagleButton)
