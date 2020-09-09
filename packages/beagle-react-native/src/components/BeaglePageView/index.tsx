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
  cloneElement, Children, isValidElement, ReactNode, useEffect,
} from 'react'
import { BeaglePageViewInterface } from 'common/models'
import { View, StyleSheet } from 'react-native'
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
  const numberChildren = Children.count(children)

  const styleSheet = StyleSheet.create({
    fromBffStyles: {
      ...style,
    },
    defaultStyles: {
      flex: style && style.flex ? Number(style.flex) : 1,
      width: '100%',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    hide: {
      display: 'none',
    },
    bulletsContainer: {
      width: '100%',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    bullets: {
      height: 10,
      width: 10,
      borderRadius: 50,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#000000',
    },
    selected: {
      backgroundColor: '#000000',
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
    if (currentPage !== undefined && currentPage !== active)
      setActive(currentPage)
  }, [currentPage])

  const updatePage = (newPageIndex: number) => {
    if (onPageChange) onPageChange(newPageIndex)
    setActive(newPageIndex)
  }

  const bullets = pageIndicator ? (
    <BeaglePageIndicator {...pageIndicator} />
  ) : null

  //TO DO: Instead of arrows, add support to swiping gesture

  // const backSlide = () => {
  //   if (active > 0) updatePage(active - 1)
  // }

  // const nextSlide = () => {
  //   if (active < numberChildren - 1)
  //     updatePage(active + 1)
  // }

  // const rightArrow = showArrow ? (
  //   <TouchableOpacity onPress={nextSlide}>
  //     <Text>Next</Text>
  //   </TouchableOpacity>
  // ) : null

  // const leftArrow = showArrow ? (
  //   <TouchableOpacity onPress={backSlide} >
  //     <Text>Back</Text>
  //   </TouchableOpacity>
  // ) : null

  return (
    <>
      <View style={[styleSheet.defaultStyles, styleSheet.fromBffStyles]}>
        {
          Children.map(children, (childId, index) => {
            if (
              isValidElement(childId)
              && childId.props
              && childId.props.children
            ) {
              if (index != active) {
                const item: ReactNode = childId.props.children
                const childrenItems = item && Children.map(item, (child) => (
                  isValidElement(child)) ?
                  cloneElement(child,
                    { style: { ...child.props.style, ...styleSheet.hide } }) : child)
                return childrenItems
              }
              return childId
            }
          })
        }
      </View>
      {bullets}
    </>
  )
}

export default BeaglePageView
