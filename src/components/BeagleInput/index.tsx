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
import { InputEvent, InputHandler, BeagleDefaultComponent, InputType } from '../types'
import withTheme from '../utils/withTheme'
import { StyledInput } from './styled'

export interface TextInputInterface extends BeagleDefaultComponent {
  value: string,
  placeholder?: string,
  disabled?: boolean,
  readOnly?: boolean,
  type?: InputType,
  hidden?: boolean,
  onChange?: InputHandler,
  onFocus?: InputHandler,
  onBlur?: InputHandler,
}

const BeagleInput: FC<TextInputInterface> = ({
  value,
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
}) => {
  const handleEvent = (handler?: InputHandler) => (event: InputEvent) => {
    if (!handler) return
    handler({ value: event.target.value })
  }

  return (
    <StyledInput
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      type={type}
      hidden={hidden}
      onChange={handleEvent(onChange)}
      onBlur={handleEvent(onBlur)}
      onFocus={handleEvent(onFocus)}
      style={style}
      className={className}
    />
  )
}

export default withTheme(BeagleInput)
