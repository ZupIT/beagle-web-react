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
import { BeagleTouchableInterface } from 'common/models'
import { TouchableOpacity, StyleSheet, View } from 'react-native'


const BeagleTouchable: FC<BeagleTouchableInterface> = ({ 
  onPress,
  style,
  children,
}) => {
  const handlePress = () => onPress && onPress()

  const styleSheet = StyleSheet.create({
    fromBffStyles: {
      ...style,
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
      <View style={{ ...styleSheet.defaultStyles, ...styleSheet.fromBffStyles }}>
        {children}
      </View>
    </TouchableOpacity>
  )
}

export default BeagleTouchable
