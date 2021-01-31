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
import { FormInterface } from 'common/models'
import withTheme from '../utils/withTheme'

const Form: FC<FormInterface> = ({
  onSubmit,
  onValidationError,
  style,
  className,
  children,
}) => {

  const lookUpInputErrors = (children: any) => {
    children = !Array.isArray(children) ? Array(children) : children

    children.map((item: any) => {
      if (item.props.children && item.props.children.length > 0)
        lookUpInputErrors(item.props.children)
      if ('error' in item.props && item.props.error) {
        return false
      }
    })
    return true
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (children){
      const canSubmitForm = lookUpInputErrors(children)

      if (canSubmitForm){
        onSubmit && onSubmit()
      } else {
        onValidationError && onValidationError()
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
