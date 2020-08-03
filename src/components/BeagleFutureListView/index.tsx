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

import React, { FC, useEffect, useRef } from 'react'
import { BeagleUIElement } from '@zup-it/beagle-web'
import Expression from '@zup-it/beagle-web/Renderer/Expression'
import Tree from '@zup-it/beagle-web/utils/Tree'
import { clone } from '@zup-it/beagle-web/utils/tree-manipulation'
import { BeagleComponent } from '../../types'
import { Direction, BeagleDefaultComponent } from '../types'
import withTheme from '../utils/withTheme'
import { StyledListView } from './styled'

export interface BeagleListViewInterface extends BeagleDefaultComponent, BeagleComponent {
  direction: Direction,
  dataSource: any[],
  onInit?: () => void,
  onScrollEnd?: () => void,
  scrollEndThreshold?: number,
  template: BeagleUIElement,
}

const BeagleListView: FC<BeagleListViewInterface> = ({
  direction,
  className,
  style,
  template,
  onInit,
  onScrollEnd,
  scrollEndThreshold,
  dataSource,
  beagleContext,
  children,
}) => {

  const elementRef = useRef() as React.MutableRefObject<HTMLDivElement>
  let node: any

  const callOnScrollEnd = () => onScrollEnd && onScrollEnd()

  const calcPercentage = () => {
    let screenPercentage
    if (direction === 'VERTICAL') {
      const scrollPosition = node.scrollTop
      screenPercentage = (scrollPosition /
        (node.scrollHeight - node.clientHeight)) * 100
    } else {
      const scrollPosition = node.scrollLeft
      screenPercentage = (scrollPosition /
        (node.scrollWidth - node.clientWidth)) * 100
    }

    if (scrollEndThreshold && screenPercentage >= scrollEndThreshold)
      callOnScrollEnd()
  }

  const verifyHasSize = () => {
    const sizeProperty = direction === 'VERTICAL' ? 'height' : 'width'
    const parent = elementRef.current.parentNode as HTMLElement
    return parent.style[sizeProperty] !== ''
  }

  const handleParentScroll = () => {
    const parent = elementRef.current.parentNode as HTMLElement
    node = verifyHasSize() || direction === 'HORIZONTAL' ? parent : document.body.parentNode
    calcPercentage()
  }

  useEffect(() => {
    if (onInit) onInit()

    if (!scrollEndThreshold) scrollEndThreshold = 100
    if (!direction) direction = 'VERTICAL'

    const parent = (verifyHasSize() || direction === 'HORIZONTAL') && elementRef &&
      elementRef.current && elementRef.current.parentNode ? elementRef.current.parentNode : window
    parent.addEventListener('scroll', handleParentScroll)

    return () => parent.removeEventListener('scroll', handleParentScroll)
  }, [])

  useEffect(() => {
    if (!Array.isArray(dataSource)) return
    const element = beagleContext.getElement() as BeagleUIElement
    if (!element) return

    element.children = dataSource.map((item) => {
      const child = clone(template)
      return Tree.replaceEach(child, component => (
        Expression.resolveForComponent(component, [{ id: 'item', value: item }])
      ))
    })

    beagleContext.getView().getRenderer().doFullRender(element, element.id)
  }, [JSON.stringify(dataSource)])

  const handleComponentScroll = () => {
    if (elementRef) {
      node = elementRef.current as HTMLElement
      calcPercentage()
    }
  }

  return (
    <StyledListView ref={elementRef} onScroll={handleComponentScroll}
      className={className} direction={direction} style={style}>
      {children}
    </StyledListView>
  )
}

export default withTheme(BeagleListView)
