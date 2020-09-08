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
import { ImageURISource, ImageResizeMode, StyleSheet, Image, ImageSourcePropType } from 'react-native'
import { BeagleImageInterface } from 'common/models'
import BeagleServiceContext from 'common/provider'
import { removeInvalidCssProperties } from '../../components/utils'

const modeMap: Record<string, ImageResizeMode> = {
  FIT_XY: 'stretch',
  CENTER_CROP: 'cover',
  CENTER: 'contain',
  FIT_CENTER: 'center',
}

const BeagleImage: FC<BeagleImageInterface> = props => {
  const { path, mode, accessibility, style } = props
  const beagleService = useContext(BeagleServiceContext)
  const imgResize: ImageResizeMode = mode && modeMap[mode] || 'contain'
  const parsedStyles = removeInvalidCssProperties(style ? style : {})
  const styleSheet = StyleSheet.create({
    fromBffStyles: {
      ...parsedStyles,
    },
    defaultStyles: {
      flex: 1,
      resizeMode: imgResize,
      height: parsedStyles.height || '100%',
      width: parsedStyles.width || '100%',
    },
  })

  const localAssetsPath = beagleService?.getConfig().localAssetsPath
  let imgSource: ImageSourcePropType = {}

  if (path._beagleImagePath_ === 'local' && path.mobileId) {
    if (localAssetsPath && localAssetsPath[path.mobileId])
      imgSource = localAssetsPath[path.mobileId]
  } else {
    imgSource = { uri: path && path.url }
  }

  return (
    <Image source={imgSource}
      style={{ ...styleSheet.defaultStyles, ...styleSheet.fromBffStyles }}
      {...accessibility} />
  )
}

export default BeagleImage
