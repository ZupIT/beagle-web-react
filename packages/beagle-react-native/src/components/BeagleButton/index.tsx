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
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import { ViewContentManager } from 'common/types'
import { isArray } from 'lodash'

function isSubmitButton(contentManager?: ViewContentManager) {
  if (!contentManager) return false
  const element = contentManager.getElement()
  let isSubmit = false
  if (element.onPress) {
    isSubmit = isArray(element.onPress) ?
      element.onPress.filter(
        value => value._beagleAction_.toLowerCase() === 'beagle:submitform').length > 0 :
      element.onPress._beagleAction_.toLowerCase() === 'beagle:submitform'
  }
  return isSubmit
}

function submitForm(){
  //TO DO: handle form submit
}

const BeagleButton: FC<BeagleButtonInterface> = ({
  text,
  onPress,
  style,
  viewContentManager,
  clickAnalyticsEvent,
}) => {
  const beagleService = useContext(BeagleServiceContext)
  const isSubmit = isSubmitButton(viewContentManager)
  const beagleAnalytics = beagleService && beagleService.analytics
  const handlePress = () => {
    if (clickAnalyticsEvent && beagleAnalytics)
      beagleAnalytics.trackEventOnClick(clickAnalyticsEvent)

    return isSubmit ? submitForm() : onPress && onPress()
  }

 

  const styleSheet = StyleSheet.create({
    fromBffStyles: {
      ...style,
    },
    defaultStyles: {
      flex: style && style.flex ? Number(style.flex) : 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#000000',
      borderStyle: 'solid',
      minHeight: 60,
      maxHeight: 60,
      margin: 5,
    },
  })
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={handlePress}
        style={{ ...styleSheet.fromBffStyles, ...styleSheet.defaultStyles }}>
        <Text>{text}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default BeagleButton
