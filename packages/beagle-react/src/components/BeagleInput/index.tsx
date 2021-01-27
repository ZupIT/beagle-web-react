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

import React, { FC, useEffect, useState } from 'react'
import { BeagleTextInputInterface, InputHandler } from 'common/models'
import { InputEvent } from '../types'
import withTheme from '../utils/withTheme'
import BeagleText from '../BeagleText'

const BeagleInput: FC<BeagleTextInputInterface> = ({
  value,
  placeholder,
  disabled,
  readOnly,
  type = 'TEXT',
  onChange,
  onFocus,
  onBlur,
  style,
  className,
  error,
  showError
}) => {

  const [touched, setTouched] = useState(false)
  const [shouldShowError, setShowError] = useState(showError)
  const errorColor = "#FF0000"
  const borderWithError: React.CSSProperties = {
    border:  touched && error && shouldShowError ? errorColor : '',
    outline:  touched && error && shouldShowError ? `auto ${errorColor}` : ''
  }

  const handleEvent = (handler?: InputHandler) => (event: InputEvent) => {
    if (!handler) return

    handler({ value: event.target.value })
  }

  const onBlurWithError = (() => {
    setTouched(true)
    return handleEvent(onBlur)
  })

  const showErrorMessage = (() => {
    if (touched && error && shouldShowError)
      return <BeagleText text={error || ''} textColor={errorColor}></BeagleText>
  })

  useEffect(() => {
    setShowError(showError)
  }, [value])

  return (
    <>
      <input
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        type={type}
        onChange={handleEvent(onChange)}
        onBlur={onBlurWithError}
        onFocus={handleEvent(onFocus)}
        style={{ ...style, ...borderWithError}}
        className={className}
      />
      {showErrorMessage()}
    </>
  )
}

export default withTheme(BeagleInput)
