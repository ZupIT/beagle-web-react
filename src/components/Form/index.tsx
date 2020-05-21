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
import Spinner from '../Spinner'
import { BeagleDefaultComponent } from '../types'
import withTheme from '../utils/withTheme'
import { StyledForm, LoadingPanel } from './styled'

export interface FormInterface extends BeagleDefaultComponent {
  isLoading?: boolean,
  onSubmit?: () => void,
  onReset?: () => void,
}

const Form: FC<FormInterface> = ({
  isLoading = false,
  onSubmit,
  onReset,
  style,
  className,
  children,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (onSubmit) onSubmit()
  }

  return (
    <StyledForm onSubmit={handleSubmit} onReset={onReset} style={style} className={className}>
      {children}
      <LoadingPanel isVisible={isLoading}>
        <Spinner />
      </LoadingPanel>
    </StyledForm>
  )
}

export default withTheme(Form)
