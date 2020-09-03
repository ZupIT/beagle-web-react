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
import { InputHandler, InputInterface } from 'common/models'
import {
  TextInputProps,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  TextInput,
  KeyboardType,
} from 'react-native'
import { removeInvalidCssProperties } from '../../components/utils'

const keyboardTypes: Record<string, KeyboardType> = {
  NUMBER: 'numeric',
  EMAIL: 'email-address',
}

const BeagleTextInput: FC<InputInterface> = ({
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
  console.log(disabled, readOnly, !disabled && !readOnly)

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
    editable: !disabled && !readOnly,
    multiline: !!isMultiline,
    secureTextEntry: type === 'PASSWORD',
    keyboardType: keyboardTypes[type] || 'default',
  }

  const parsedStyles = removeInvalidCssProperties(style ? style : {})

  const styleSheet = StyleSheet.create({
    fromBffStyles: {
      ...parsedStyles,
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
