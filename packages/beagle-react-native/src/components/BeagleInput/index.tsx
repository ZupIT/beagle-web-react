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

import React, { FC, useState } from 'react'
import { BeagleTextInputInterface, InputHandler } from 'common/models'
import {
  TextInputProps,
  StyleSheet,
  TextInput,
  KeyboardType,
} from 'react-native'

const keyboardTypes: Record<string, KeyboardType> = {
  NUMBER: 'numeric',
  EMAIL: 'email-address',
}

const BeagleTextInput: FC<BeagleTextInputInterface> = ({
  value,
  placeholder,
  readOnly,
  type = 'TEXT',
  onChange,
  onFocus,
  onBlur,
  style,
  enabled = true,
}) => {

  const handleOnChange = (text: string) => onChange && onChange({ value: text })
  const handleOnFocus = () => onFocus && onFocus({ value })
  const handleOnBlur = () => onBlur && onBlur({ value })

  const inputProps: TextInputProps = {
    value,
    placeholder,
    onChangeText: handleOnChange,
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
    editable: enabled && !readOnly,
    secureTextEntry: type === 'PASSWORD',
    keyboardType: keyboardTypes[type] || 'default',
    focusable: enabled,
  }

  const styleSheet = StyleSheet.create({
    fromBffStyles: {
      ...style,
    },
    defaultStyles: {
      borderWidth: 1,
      borderColor: '#000',
      borderStyle: 'solid',
      backgroundColor: '#FFF',
    },
  })

  return (
    <TextInput
      {...inputProps}
      style={{
        ...styleSheet.defaultStyles,
        ...styleSheet.fromBffStyles,
      }}>
    </TextInput>
  )
}

export default BeagleTextInput
