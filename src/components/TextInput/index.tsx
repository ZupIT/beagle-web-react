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
import { InputEvent, InputHandler, BeagleDefaultComponent } from '../types'
import withTheme from '../utils/withTheme'
import { InputGroup, Label, StyledInput } from './styled'

interface TextInputInterface extends BeagleDefaultComponent {
  value: string,
  label?: string,
  placeholder?: string,
  type?: string,
  name?: string,
  disabled?: boolean,
  readonly?: boolean,
  onChange?: InputHandler,
  onFocus?: InputHandler,
  onBlur?: InputHandler,
}

const TextField: FC<TextInputInterface> = ({
  value,
  label,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  type,
  disabled,
  readonly,
  name,
  style,
  className,
}) => {
  const handleEvent = (handler?: InputHandler) => (event: InputEvent) => {
    if (!handler) return
    handler({ value: event.target.value })
  }

  return (
    <InputGroup>
      {label && <Label>{label}:</Label>}
      <StyledInput
        value={value}
        placeholder={placeholder}
        onChange={handleEvent(onChange)}
        onBlur={handleEvent(onBlur)}
        onFocus={handleEvent(onFocus)}
        type={type}
        disabled={disabled}
        // @ts-ignore
        readonly={readonly}
        name={name}
        style={style}
        className={className}
      />
    </InputGroup>
  )
}

export default withTheme(TextField)
