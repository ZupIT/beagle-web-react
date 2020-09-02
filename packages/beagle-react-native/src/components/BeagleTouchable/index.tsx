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
import { BeagleTouchableInterface } from 'common/models'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { removeInvalidCssProperties } from '../../components/utils'


const BeagleTouchable: FC<BeagleTouchableInterface> = ({ 
  onPress,
  clickAnalyticsEvent,
  style,
  children,
}) => {
  const beagleService = useContext(BeagleServiceContext)
  const beagleAnalytics = beagleService && beagleService.analytics
  const handlePress = () => {
    if (clickAnalyticsEvent && beagleAnalytics)
      beagleAnalytics.trackEventOnClick(clickAnalyticsEvent)
    return onPress && onPress()
  }

  const parsedStyles = removeInvalidCssProperties(style ? style : {})

  const styleSheet = StyleSheet.create({
    fromBffStyles: {
      ...parsedStyles,
    },
    defaultStyles: {
      flex: style && style.flex ? Number(style.flex) : 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    },
    touchable:{
      flex: style && style.flex ? Number(style.flex) : 1,
    },
  })
  return (
    <TouchableOpacity onPress={handlePress} style={styleSheet.touchable}>
      <View style={{ ...styleSheet.fromBffStyles, ...styleSheet.defaultStyles }}>
        {children}
      </View>
    </TouchableOpacity>
  )
}

export default BeagleTouchable
