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

export type NodeType = HTMLElement | null

export interface BeagleListViewInterface extends BeagleDefaultComponent, BeagleComponent {
  direction: Direction,
  dataSource: any[],
  onInit?: () => void,
  onScrollEnd?: () => void,
  scrollEndThreshold?: number,
  template: BeagleUIElement,
  useParentScroll?: boolean,
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
  useParentScroll,
}) => {

  const elementRef = useRef() as React.MutableRefObject<HTMLDivElement>
  let node: NodeType

  if (!scrollEndThreshold) scrollEndThreshold = 100
  if (!direction) direction = 'VERTICAL'
  if (useParentScroll === undefined) useParentScroll = false

  const callOnScrollEnd = () => onScrollEnd && onScrollEnd()

  const calcPercentage = () => {
    if (!node) return

    let screenPercentage: number
    if (direction === 'VERTICAL') {
      const scrollPosition = node.scrollTop
      screenPercentage = (scrollPosition /
        (node.scrollHeight - node.clientHeight)) * 100
    } else {
      const scrollPosition = node.scrollLeft
      screenPercentage = (scrollPosition /
        (node.scrollWidth - node.clientWidth)) * 100
    }
    
    if (scrollEndThreshold && screenPercentage >= scrollEndThreshold) callOnScrollEnd()
  }

  const hasHorizontalScroll = (nodeElement: NodeType): boolean => {
    if (!nodeElement) return false

    const overflowX = getComputedStyle(nodeElement).overflowX

    const hasXscroll = overflowX !== 'visible' && overflowX !== 'hidden'

    return (nodeElement.clientWidth === 0 ||
      nodeElement.scrollWidth <= nodeElement.clientWidth ||
      !hasXscroll)
  }

  const hasVerticalScroll = (nodeElement: NodeType): boolean => {
    if (!nodeElement) return false

    const overflowY = getComputedStyle(nodeElement).overflowY
    const hasYscroll = overflowY !== 'visible' && overflowY !== 'hidden'
    return (nodeElement.clientHeight === 0 ||
      nodeElement.scrollHeight <= nodeElement.clientHeight ||
      !hasYscroll)
  }

  const getParentNode = (nodeElement: NodeType): NodeType => {
    if (!nodeElement) return null
    if (nodeElement.nodeName === 'HTML') return nodeElement

    if (direction === 'VERTICAL' && hasVerticalScroll(nodeElement) ||
      direction === 'HORIZONTAL' && hasHorizontalScroll(nodeElement))
      return getParentNode(nodeElement.parentNode as HTMLElement)

    return nodeElement
  }

  const getReferenceNode = (): NodeType => {
    if (!elementRef || !elementRef.current)
      return null

    if (useParentScroll || direction === 'HORIZONTAL') {
      let parentNode = elementRef.current.parentNode as NodeType
      parentNode = getParentNode(parentNode)
      return parentNode as NodeType
    }
    return (elementRef.current as NodeType)
  }

  useEffect(() => {
    if (onInit) onInit()
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

  useEffect(() => {
    const referenceNode = getReferenceNode()
    if (referenceNode !== node) {
      if (node !== undefined && node !== null) node.removeEventListener('scroll', calcPercentage)
      node = referenceNode
      const parent = (node && node.nodeName !== 'HTML')
        ? node : window

      parent.addEventListener('scroll', calcPercentage)
      return () => parent.removeEventListener('scroll', calcPercentage)

    }
  }, [children])

  return (
    <StyledListView ref={elementRef}
      className={className} direction={direction}
      useParentScroll={useParentScroll} style={style}>
      {children}
    </StyledListView>
  )
}

export default withTheme(BeagleListView)
