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
import { BeagleModalInterface } from 'common/models'
import { StyledView } from './styled'
import { StyleSheet, Modal } from 'react-native'

const BeagleModal: FC<BeagleModalInterface> = props => {
  const { onClose, isOpen, style, children } = props

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onDismiss={onClose}
      visible={isOpen}>
      <StyledView style={styles.modalView} cssStyles={style}>
        {children}
      </StyledView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalView: {
    flex: 3,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  }
});

export default BeagleModal