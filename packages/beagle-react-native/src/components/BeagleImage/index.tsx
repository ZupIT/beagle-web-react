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
import { ImageResizeMode, StyleSheet, Image, ImageSourcePropType } from 'react-native'
import { BeagleImageInterface } from 'common/models'
import BeagleServiceContext from 'common/provider'
import { BeagleUIReactNativeService } from 'common/types'
import { logger } from '@zup-it/beagle-web'


const modeMap: Record<string, ImageResizeMode> = {
  FIT_XY: 'stretch',
  CENTER_CROP: 'cover',
  CENTER: 'contain',
  FIT_CENTER: 'center',
}

const BeagleImage: FC<BeagleImageInterface> = props => {
  const { path, mode, accessibility, style } = props
  const beagleService = useContext(BeagleServiceContext) as BeagleUIReactNativeService
  const imgResize: ImageResizeMode = mode && modeMap[mode] || 'contain'
  
  const styleSheet = StyleSheet.create({
    fromBffStyles: {
      ...style,
    },
    defaultStyles: {
      flex:  style && style.flex ? Number(style.flex) : 1,
      resizeMode: imgResize,
      height: style && style.height || '100%',
      width: style && style.width || '100%',
    },
  })

  const localAssetsPath = beagleService?.getConfig().localAssetsPath
  let imgSource: ImageSourcePropType | null = null

  if (path._beagleImagePath_ === 'local' && path.mobileId) {
    if (localAssetsPath && localAssetsPath[path.mobileId]) {
      imgSource = localAssetsPath[path.mobileId]
    } else {
      logger.warn(`Beagle could not find image source ${path.mobileId}`)
    }
  } else {
    imgSource = { uri: path && path.url }
  }

  return imgSource ? (
    <Image
      source={imgSource}
      style={{ ...styleSheet.defaultStyles, ...styleSheet.fromBffStyles }}
      {...accessibility}
    />
  ) : null
}

export default BeagleImage
