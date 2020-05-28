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
import { BeagleComponent } from '../../types'
import { BeagleDefaultComponent, ImageContentMode } from '../types'
import withTheme from '../utils/withTheme'
import { StyledImage } from './styled'

export interface BeagleImageInterface extends BeagleComponent, BeagleDefaultComponent {
  url: string,
  mode: 'Network' | 'Local',
  contentMode?: ImageContentMode,
}

export const getContentModeValue = (contentMode?: ImageContentMode) => {
  if (contentMode === 'FIT_XY')
    return 'fill'

  if (contentMode === 'CENTER_CROP')
    return 'none'

  if (contentMode === 'CENTER')
    return 'contain'
  
  return 'cover'
}

const BeagleImage: FC<BeagleImageInterface> = ({
  className,
  mode,
  url,
  beagleContext,
  style,
  contentMode,
}) => {
  const source = (mode === 'Local' || !beagleContext)
    ? url
    : beagleContext.getView().getUrlBuilder().build(url)
    
  return <StyledImage contentMode={getContentModeValue(contentMode)} 
    src={source} className={className} style={style} />
}

export default withTheme(BeagleImage)
