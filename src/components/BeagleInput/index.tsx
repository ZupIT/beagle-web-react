/*
 * Copyright 2020, 2022 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
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
import { BeagleTextInputInterface, InputHandler } from 'models'
import { InputEvent } from 'components/types'
import { buildAccessibility } from 'utils/accessibility'
import withTheme from 'components/utils/withTheme'
import BeagleText from 'components/BeagleText'
import { StyledInput, errorColor } from './styled'

const BeagleInput: FC<BeagleTextInputInterface> = ({
  value,
  placeholder,
  enabled,
  readOnly,
  type = 'TEXT',
  onChange,
  onFocus,
  onBlur,
  style,
  className,
  accessibility,
  error,
  showError,
}) => {
  const a11y = buildAccessibility(accessibility)
  const isEnabled = enabled === false
  const handleEvent = (handler?: InputHandler) => (event: InputEvent) => {
    if (!handler) return
    handler({ value: event.target.value })
  }
  const showErrorMessage = () => {
    if (error && showError)
      return (
        <BeagleText
          text={error || ''}
          textColor={errorColor}
          style={{ fontSize: '0.8rem' }}
        ></BeagleText>
      )
  }

  return (
    <>
      <StyledInput
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        type={type}
        onChange={handleEvent(onChange)}
        onBlur={handleEvent(onBlur)}
        onFocus={handleEvent(onFocus)}
        style={{ ...style }}
        className={className}
        error={error}
        showError={showError}
        aria-placeholder={placeholder}
        aria-disabled={isEnabled}
        aria-readonly={readOnly}
        {...a11y}
      />
      {showErrorMessage()}
    </>
  )
}

export default withTheme(BeagleInput)
