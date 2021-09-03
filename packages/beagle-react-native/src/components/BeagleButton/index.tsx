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

import React, { FC } from 'react'
import { BeagleButtonInterface } from 'common/models'
import { Button, View } from 'react-native'
import { ViewContentManager } from 'common/types'

function isSubmitButton(contentManager?: ViewContentManager) {
  if (!contentManager) return false
  const element = contentManager.getElement()
  let isSubmit = false
  if (element.onPress) {
    isSubmit = Array.isArray(element.onPress) ?
      element.onPress.filter(
        value => value._beagleAction_.toLowerCase() === 'beagle:submitform').length > 0 :
      element.onPress._beagleAction_.toLowerCase() === 'beagle:submitform'
  }
  return isSubmit
}

function submitForm() {
  // To DO: Handle Form Submit Action
}

const BeagleButton: FC<BeagleButtonInterface> = ({
  text,
  onPress,
  style,
  viewContentManager,
  enabled = true,
  accessibility,
}) => {
  const isSubmit = isSubmitButton(viewContentManager)
  const handlePress = () => isSubmit ? submitForm() : onPress && onPress()

  return (
    <View style={style}>
      <Button
        onPress={handlePress}
        title={text}
        accessibilityLabel={accessibility?.accessibilityLabel}
        disabled={!enabled}
      />
    </View>
  )
}

export default BeagleButton
