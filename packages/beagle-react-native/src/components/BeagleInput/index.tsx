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
import { InputHandler, InputInterface } from 'common/models'
import {
  TextInputProps,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  TextInput,
} from 'react-native'
import { removeInvalidCssProperties } from '../../components/utils'

const BeagleTextInput: FC<InputInterface> = props => {
  const { value,
    placeholder,
    disabled,
    readOnly,
    hidden,
    onChange,
    onFocus,
    onBlur,
    style,
    isMultiline } = props

  let previousInputValue: string

  const handleEvent = (handler?: InputHandler) => (e: NativeSyntheticEvent<any>) => {
    previousInputValue = e.nativeEvent.text
    return handler && handler({ value: previousInputValue })
  }

  function handleOnFocus(_e: NativeSyntheticEvent<TextInputFocusEventData>) {
    return onFocus && onFocus({ value: previousInputValue })
  }

  const inputProps: TextInputProps = {
    value: value,
    placeholder: placeholder,
    //onChangeText
    onChange: handleEvent(onChange),
    onFocus: handleOnFocus,
    onEndEditing: handleEvent(onBlur),
    // editable: !!disabled || !readOnly,
    multiline: isMultiline || false,
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
      style={
        {
          ...styleSheet.defaultStyles,
          ...styleSheet.fromBffStyles,
          ...styleSheet.hidden,
        }}>
    </TextInput>
  )
}

export default BeagleTextInput
