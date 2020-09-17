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
  value: initialValue,
  placeholder,
  disabled,
  readOnly,
  type = 'TEXT',
  onChange,
  onFocus,
  onBlur,
  style,
}) => {

  const [value, setValue] = useState(initialValue)
  const isEditable = !disabled && !readOnly

  const handleEvent = (handler?: InputHandler) => (text: string) => {
    setValue(text)
    return handler && handler({ value: text })
  }

  const handleOnFocus = () => onFocus && onFocus({ value })

  const handleOnBlur = () => onBlur && onBlur({ value })

  const inputProps: TextInputProps = {
    value: value,
    placeholder: placeholder,
    onChangeText: handleEvent(onChange),
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
    editable: isEditable,
    secureTextEntry: type === 'PASSWORD',
    keyboardType: keyboardTypes[type] || 'default',
  }

  const styleSheet = StyleSheet.create({
    fromBffStyles: {
      ...style,
    },
    defaultStyles: {
      flex: style && style.flex ? Number(style.flex) : 1,
      borderWidth: 1,
      borderColor: '#000000',
      borderStyle: 'solid',
      margin: 5,
      maxHeight: 50,
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
