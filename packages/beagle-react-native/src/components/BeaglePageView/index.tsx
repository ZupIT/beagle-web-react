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

import React, {
  FC, useState,
  cloneElement, Children, isValidElement, ReactNode, useEffect, useRef,
} from 'react'
import { BeaglePageViewInterface } from 'common/models'
import { View, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
import BeaglePageIndicator from '../../components/PageIndicator'

const BeaglePageView: FC<BeaglePageViewInterface> = ({
  children, onPageChange, currentPage, showArrow, style,
  /**
   * @deprecated Since version 1.1. Will be deleted in version 2.0.
   * Use pageIndicator as a component instead.
  */
  pageIndicator,
}) => {

  const [active, setActive] = useState(currentPage || 0)
  const swiperRef = useRef() as React.MutableRefObject<Swiper>

  const styleSheet = StyleSheet.create({
    fromBffStyles: {
      ...style,
    },
  })

  showArrow = showArrow !== undefined ? showArrow : true

  useEffect(() => {
    if (pageIndicator)
      console.warn(`The page view you are using is deprecated. 
      This will be removed in a future version; please refactor this component 
      using new context features.`)
  }, [])

  useEffect(() => {
    if (currentPage !== undefined && currentPage !== active) {
      setActive(currentPage)
      swiperRef.current.scrollTo(currentPage)
    }
  }, [currentPage])

  const updatePage = (newPageIndex: number) => {
    if (onPageChange) onPageChange(newPageIndex)
    setActive(newPageIndex)
  }

  const bullets = pageIndicator ? (
    <BeaglePageIndicator {...pageIndicator} />
  ) : null

  return (
    <>
      <Swiper
        ref={swiperRef}
        loop={false}
        onIndexChanged={(index) => updatePage(index)}
        showsPagination={false}
        style={[styleSheet.fromBffStyles]}>
        {children}
      </Swiper>
      {bullets}
    </>
  )
}

export default BeaglePageView
