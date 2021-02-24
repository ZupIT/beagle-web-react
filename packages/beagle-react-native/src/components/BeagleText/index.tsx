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

import React, { FC, useEffect, useState } from 'react'
import { BeagleTextInterface, MobileAlignment } from 'common/models'
import { Text, StyleSheet } from 'react-native'
import { logger } from '@zup-it/beagle-web'

const alignMap: Record<string, MobileAlignment> = {
  auto: 'auto',
  center: 'center',
  left: 'left',
  right: 'right',
}

const BeagleText: FC<BeagleTextInterface> = props => {
  const { text, textColor, alignment, style } = props
  const [renderedText, setRenderedText] = useState<string>('')

  const parsedAlignment = alignment && alignment != 'INHERIT' ?
    alignMap[alignment.toLowerCase()] :
    'auto'
  const styleSheet = StyleSheet.create({
    fromBffStyles: {
      ...style,
    },
    defaultStyles: {
      color: textColor || '#000000',
      textAlign: parsedAlignment,
    },
  })

  useEffect(() => {
    try {
      if (text && typeof text === 'object') {
        setRenderedText(JSON.stringify(text))
      } else setRenderedText((text && typeof text !== 'function') ? String(text) : '')
    } catch (error) {
      logger.error(error)
      setRenderedText('')
    }
  }, [text])

  return (
    <Text
      style={{
        ...styleSheet.defaultStyles,
        ...styleSheet.fromBffStyles,
      }}>
      {renderedText}
    </Text>
  )
}

export default BeagleText
