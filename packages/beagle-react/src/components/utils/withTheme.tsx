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
import { filterBooleanArray } from 'common/utils/array'

export interface InputProps {
  className?: string,
}

export interface OutputProps {
  className?: string,
  styleId?: string,
}

// HOC for adding theming properties to the default components
function withTheme<T extends InputProps>(Component: FC<T>): FC<T & OutputProps> {
  const ComponentWithTheme: FC<T & OutputProps> = ({ className, styleId, ...props }) => {
    const validClass = filterBooleanArray([className, styleId])
    const classNames = validClass.join()

    // @ts-ignore: this error makes zero sense
    return <Component className={classNames} {...props} />
  }

  return ComponentWithTheme
}

export default withTheme
