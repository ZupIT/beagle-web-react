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

import React, { FC, useState } from 'react'
import { BeagleTouchableInterface } from 'models'
import { buildAccessibility } from 'utils/accessibility'
import withTheme from 'components/utils/withTheme'
import { StyledBeagleTouchable } from './styled'

const BeagleTouchable: FC<BeagleTouchableInterface> = ({ 
  onPress,
  className,
  style,
  children,
  accessibility,
}) => {
  const a11y = buildAccessibility(accessibility)
 
  const [pressed, setPressed] = useState(false)
 

  const handlePress = () => {
    setPressed(false) 
    return onPress && onPress()
  }
  
  return (
    <StyledBeagleTouchable 
      className={className}
      onMouseDown={e => setPressed(true)} 
      onClick={handlePress} 
      style={style}
      aria-pressed={pressed}
      {...a11y}>
      {children}
    </StyledBeagleTouchable>
  )
}

export default withTheme(BeagleTouchable)
