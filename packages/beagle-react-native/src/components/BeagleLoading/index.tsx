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
import { BeagleDefaultComponent } from 'common/models'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

const BeagleLoading: FC<BeagleDefaultComponent> = props => {
  const { style } = props
  
  const styleSheet = StyleSheet.create({
    fromBffStyles: {
      ...style,
    },
    defaultStyles: {
      flex: style && style.flex ? Number(style.flex) : 1,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
  })

  return (
    <View style={[styleSheet.container, styleSheet.horizontal]}>
      <ActivityIndicator 
        animating={true} 
        color="#125285" 
        style={{ ...styleSheet.defaultStyles, ...styleSheet.fromBffStyles }} 
        size="large" />
    </View>
   
  )
  
}

export default BeagleLoading
