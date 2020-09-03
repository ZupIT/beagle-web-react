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

import React, { FC, useEffect } from 'react'
import { BeagleModalInterface } from 'common/models'
import { StyleSheet, Modal, View } from 'react-native'
import { removeInvalidCssProperties } from '../../components/utils'

const BeagleModal: FC<BeagleModalInterface> = props => {
  const { onClose, isOpen, style, children } = props
  const parsedStyles = removeInvalidCssProperties(style ? style : {})
  const styleSheet = StyleSheet.create({
    fromBffStyles: {
      ...parsedStyles,
    },
    defaultStyles: {
      flex: 3,
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  })

  useEffect(()=>{
    if(!isOpen && onClose){
      onClose()
    }
  },[isOpen])

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isOpen}>
      <View style={{ ...styleSheet.defaultStyles, ...styleSheet.fromBffStyles }}>
        {children}
      </View>
    </Modal>
  )
}

export default BeagleModal
