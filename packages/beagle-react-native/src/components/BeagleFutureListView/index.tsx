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

import React, { FC, useEffect, useRef, useState } from 'react'
import { BeagleFutureListViewInterface } from 'common/models'
import { ScrollView, StyleSheet, NativeScrollEvent, NativeScrollPoint } from 'react-native'
import { Tree, logger, BeagleUIElement } from '@zup-it/beagle-web'
import { renderListViewDynamicItems } from 'components/utils'

const BeagleFutureListView: FC<BeagleFutureListViewInterface> = ({
  dataSource,
  direction,
  template,
  __suffix__,
  _key,
  children,
  className,
  iteratorName = 'item',
  onInit,
  onScrollEnd,
  scrollEndThreshold = 100,
  style,
  useParentScroll,
  viewContentManager
}) => {
  const scrollRef = useRef(null)
  const horizontal = direction && direction === 'HORIZONTAL'
  const styleSheet = StyleSheet.create({
    fromBffStyles: {
      ...style,
    },
    defaultStyles: {
      flex: style && style.flex ? Number(style.flex) : 1,
      borderWidth: 1,
      borderColor: '#000000',
      borderStyle: 'solid',
    },
  })

  const [shouldLoadPage, setShoudlLoadPage] = useState(true)

  useEffect(() => {
    onInit && onInit() || onScrollEnd && onScrollEnd()
  }, [])

  useEffect(() => {
   renderListViewDynamicItems(
     dataSource,
     viewContentManager,
     template,
     _key,
     __suffix__,
     iteratorName
   )
   setShoudlLoadPage(true)
  }, [JSON.stringify(dataSource)])

  const hasReachedEndOfList = ({
    contentOffset,
    layoutMeasurement,
    contentSize }: NativeScrollEvent) => {

    let offset = contentOffset.y
    let layoutSize = layoutMeasurement.height
    let listSize = contentSize.height
    if (direction === 'HORIZONTAL') {
      offset = contentOffset.x
      layoutSize = layoutMeasurement.width
      listSize = contentSize.width
    }
    const sizeSum = offset + layoutSize

    return Math.round(sizeSum)
      >= Math.round(listSize * scrollEndThreshold / 100)
  }

  function callOnEndAction(nativeEvent: NativeScrollEvent) {
    if (hasReachedEndOfList(nativeEvent) && shouldLoadPage) {
      setShoudlLoadPage(false)
      onScrollEnd && onScrollEnd() 
    }
  }

  return (
    <ScrollView
      ref={scrollRef}
      onScroll={({ nativeEvent }) => callOnEndAction(nativeEvent)}
      scrollEventThrottle={1000}
      style={
        {
          ...styleSheet.defaultStyles,
          ...styleSheet.fromBffStyles,
        }}
      horizontal={horizontal}>
      {children}
    </ScrollView>
  )
}

export default BeagleFutureListView
