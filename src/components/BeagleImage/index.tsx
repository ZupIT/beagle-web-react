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
import UrlBuilder from '@zup-it/beagle-web/UrlBuilder'
import { BeagleComponent } from '../../types'
import { BeagleDefaultComponent, ImageMode } from '../types'
import withTheme from '../utils/withTheme'
import { StyledImage, StyledFigure } from './styled'

export type ImagePathMode = 'local' | 'remote'

export interface ImagePath {
  _beagleImagePath_: ImagePathMode,
  url: string,
}

export interface Accessibility {
  accessible: boolean,
  accessibilityLabel?: string,
}

export interface BeagleImageInterface extends BeagleComponent, BeagleDefaultComponent {
  path: ImagePath,
  mode?: ImageMode,
  accessibility?: Accessibility,
}

const modeMap = {
  FIT_XY: 'fill',
  CENTER_CROP: 'none',
  CENTER: 'contain',
  FIT_CENTER: 'cover',
}

const BeagleImage: FC<BeagleImageInterface> = ({
  className,
  path,
  beagleContext,
  style,
  mode,
  accessibility,
}) => {
  const source = (path._beagleImagePath_ === 'local' || !beagleContext)
    ? path.url
    : UrlBuilder.build(path.url)

  return (
    <StyledFigure className={className} style={style} >
      <StyledImage mode={(mode && modeMap[mode]) || 'cover'}
        src={source} alt={accessibility && accessibility.accessibilityLabel} />
    </StyledFigure>
  )
}

export default withTheme(BeagleImage)
