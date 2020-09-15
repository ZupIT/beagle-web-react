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
import { BeagleReactNativeInputInterface, InputHandler } from 'common/models'
import { evaluateStringBoolean } from 'common/utils/primitive'
import {
  TextInputProps,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  TextInput,
  KeyboardType,
} from 'react-native'

const keyboardTypes: Record<string, KeyboardType> = {
  NUMBER: 'numeric',
  EMAIL: 'email-address',
}

const BeagleTextInput: FC<BeagleReactNativeInputInterface> = ({
  value: initialValue,
  placeholder,
  disabled,
  readOnly,
  type = 'TEXT',
  hidden,
  onChange,
  onFocus,
  onBlur,
  style,
  className,
  isMultiline,
}) => {

  const [value, setValue] = useState(initialValue)
  const isEditable = !evaluateStringBoolean(disabled as string)
      && !evaluateStringBoolean(readOnly as string)

  const handleEvent = (handler?: InputHandler) => (text: string) => {
    setValue(text)
    return handler && handler({ value: text })
  }

  const handleOnFocus = (_e: NativeSyntheticEvent<TextInputFocusEventData>) =>
    onFocus && onFocus({ value })

  const handleOnBlur = (_e: NativeSyntheticEvent<TextInputFocusEventData>) =>
    onBlur && onBlur({ value })

  const inputProps: TextInputProps = {
    value: value,
    placeholder: placeholder,
    onChangeText: handleEvent(onChange),
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
    editable: isEditable,
    multiline: !!isMultiline,
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
      maxHeight: isMultiline ? 100 : 50,
    },
    hidden: {
      opacity: hidden && hidden === true ? 0 : 1,
    },
  })

  return (
    <TextInput
      {...inputProps}
      style={{
        ...styleSheet.defaultStyles,
        ...styleSheet.fromBffStyles,
        ...styleSheet.hidden,
      }}>
    </TextInput>
  )
}

export default BeagleTextInput