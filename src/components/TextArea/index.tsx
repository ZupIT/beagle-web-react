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
import { InputGroup, Label, StyledTextArea } from './styled'

export interface TextAreaInterface extends BeagleDefaultComponent {
  value?: string,
  label?: string,
  name?: string,
  onChange?: InputHandler,
  onFocus?: InputHandler,
  onBlur?: InputHandler,
  disabled?: boolean,
  readonly?: boolean,
}

const TextArea: FC<TextAreaInterface> = ({
  value,
  label,
  name,
  onChange,
  onFocus,
  onBlur,
  disabled,
  readonly,
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
      <StyledTextArea
        name={name}
        value={value}
        onChange={handleEvent(onChange)}
        onBlur={handleEvent(onBlur)}
        onFocus={handleEvent(onFocus)}
        disabled={disabled}
        readOnly={readonly}
        style={style}
        className={className}
      />
    </InputGroup>
  )
}

export default withTheme(TextArea)
