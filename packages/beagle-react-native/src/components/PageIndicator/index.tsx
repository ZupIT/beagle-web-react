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

import React, { FC, Children } from 'react'
import { StyleSheet, View } from 'react-native'
import { PageIndicatorInterface } from 'common/models'

const BeaglePageIndicator: FC<PageIndicatorInterface> = props => {
  const { currentPage, numberOfPages, selectedColor, unselectedColor } = props

  const styleSheet = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      flexDirection: 'row',
    },
    bullets: {
      height: 10,
      width: 10,
      borderRadius: 50,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#000000',
      margin: 5,
    },
    selected: {
      backgroundColor: selectedColor || '#000000',
    },
    unselected: {
      backgroundColor: unselectedColor || '#FFFFFF',
    },
  })

  const totalPages = numberOfPages ? Array(numberOfPages) : []

  return (
    <View style={styleSheet.container}>
      {
        Children.map(totalPages, (child, index) => (
          <View
            key={index}
            style={[styleSheet.bullets,
              index === currentPage ? styleSheet.selected : styleSheet.unselected]}>
          </View>
        ))
      }
    </View>
  )
}

export default BeaglePageIndicator
