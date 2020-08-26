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
import { BeagleTextInputInterface, InputHandler } from 'common/models'
import { 
  TextInputProps, 
  NativeSyntheticEvent, 
  StyleSheet, 
  TextInputFocusEventData } from 'react-native'
import { StyledTextInput } from './styled'

const BeagleTextArea: FC<BeagleTextInputInterface> = props => {
  const { value,
    placeholder,
    disabled,
    readOnly,
    hidden,
    onChange,
    onFocus,
    onBlur,
    style } = props

  let previousInputValue: string

  const handleEvent = (handler?: InputHandler) => (e: NativeSyntheticEvent<any>) => {
    previousInputValue = e.nativeEvent.text
    console.log(previousInputValue)
    return handler && handler({ value: previousInputValue })
  }
  
  function handleOnFocus(_e: NativeSyntheticEvent<TextInputFocusEventData>) {
    console.log(previousInputValue)
    return onFocus && onFocus({ value: previousInputValue })
  }

  const inputProps: TextInputProps = {
    value: value,
    placeholder: placeholder,
    onChange: handleEvent(onChange),
    onFocus: handleOnFocus,
    onEndEditing: handleEvent(onBlur),
    multiline: true,
  }

  const inputStyles = StyleSheet.create({
    hidden:{
      opacity: hidden && hidden === true ?  0 : 1,
    },
  })

  return (
    <StyledTextInput {...inputProps} cssStyles={style} style={inputStyles.hidden}>
    </StyledTextInput>
  )
}

export default BeagleTextArea
