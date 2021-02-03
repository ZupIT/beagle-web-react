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

import React, { FC, ReactElement } from 'react'
import { FormInterface } from 'common/models'
import withTheme from '../utils/withTheme'

const Form: FC<FormInterface> = ({
  onSubmit,
  onValidationError,
  style,
  className,
  children,
}) => {


  const lookUpInputErrors = (elements: any): boolean => {
    let childrenArray = React.Children.toArray(elements)
    
    for (const item of childrenArray as ReactElement[]) {
      if (item.props.error) return true
      if (lookUpInputErrors(item.props.children)) return true
    }
    return false
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (children) {
      const hasError = lookUpInputErrors(children)
      if (hasError) {
        onValidationError && onValidationError()
      } else {
        onSubmit && onSubmit()
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} style={style} className={className}>
      {children}
    </form>
  )
}

export default withTheme(Form)
