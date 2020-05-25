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

import React, { FC, useContext } from 'react'
import { BeagleComponent } from '../../types'
import { filterBooleanArray } from '../../utils/array'
import BeagleProvider from '../../provider'
import { ImageContentMode } from '../types'
import { StyledImage } from './styled'

export interface BeagleImageInterface extends BeagleComponent {
  url: string,
  mode: 'Network' | 'Local',
  styleId?: string,
  className?: string,
  style?: React.CSSProperties,
  contentMode?: ImageContentMode,
}

export const getContentModeValue = (contentMode?: ImageContentMode) => {
  if (contentMode === 'FIT_XY')
    return 'fill'

  if (contentMode === 'FIT_CENTER')
    return 'cover'

  if (contentMode === 'CENTER_CROP')
    return 'none'

  if (contentMode === 'CENTER')
    return 'contain'
}

const BeagleImage: FC<BeagleImageInterface> = ({
  className,
  styleId,
  mode,
  url,
  beagleContext,
  style,
  contentMode,
}) => {
  const beagleService = useContext(BeagleProvider)
  const validClass = filterBooleanArray([className, styleId])
  const classNames = validClass.join()
  let root = ''

  if (beagleService)
    root = beagleService.getConfig().sourceRoot || ''
    
  const source = (mode === 'Local' || !beagleContext)
    ? `${root}${url}`
    : beagleContext.getView().getUrlBuilder().build(url)
    
  return <StyledImage contentMode={getContentModeValue(contentMode)} 
    src={source} className={classNames} style={style} />
}

export default BeagleImage
