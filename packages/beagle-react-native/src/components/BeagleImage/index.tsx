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
import { ImageURISource, ImageResizeMode, ImageStyle, SafeAreaView } from 'react-native'
import { BeagleImageInterface } from 'common/models'
import { StyledImage } from './styled'

const modeMap: Record<string, ImageResizeMode> = {
  FIT_XY: 'stretch',
  CENTER_CROP: 'cover',
  CENTER: 'contain',
  FIT_CENTER: 'center',
}

const BeagleImage: FC<BeagleImageInterface> = props => {
  const { path, mode, accessibility, style } = props
  const imgResize: ImageResizeMode = mode && modeMap[mode] || 'contain'

  const parseSizes = (size: string) =>  /px/.test(size) ? Number(size.replace('px', '')) : size
  const parsedWidth = style && style.width && parseSizes(style.width.toString())
  const parsedHeight = style && style.height && parseSizes(style.height.toString())

  const defaultImgStyle: ImageStyle = {
    flex: 1,
    resizeMode: imgResize,
    height: parsedHeight || "100%",
    width: parsedWidth || "100%"
  }

  //TO DO: Add support to dynamic local images

  const imgSource: ImageURISource = {
    uri: path && path.url
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StyledImage source={imgSource} style={defaultImgStyle} {...accessibility} cssStyles={style} />
    </SafeAreaView>
  )
}

export default BeagleImage