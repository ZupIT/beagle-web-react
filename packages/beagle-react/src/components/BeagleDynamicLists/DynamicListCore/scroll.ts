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

import { useEffect, useRef } from 'react'
import { ScrollInterface, NodeType } from '../../../../../common/models'

function useScroll(props: ScrollInterface, deps: any[]) {
  const allowedOnScrollRef = useRef(true)
  const {
    direction,
    onScrollEnd,
    scrollEndThreshold,
    useParentScroll,
    elementRef,
    hasRendered,
  } = props

  let node: NodeType

  const hasHorizontalScroll = (nodeElement: NodeType): boolean => {
    if (!nodeElement) return false

    const overflowX = getComputedStyle(nodeElement).overflowX

    const hasXScroll = overflowX !== 'visible' && overflowX !== 'hidden'

    return (nodeElement.clientWidth === 0 ||
      nodeElement.scrollWidth <= nodeElement.clientWidth ||
      !hasXScroll)
  }

  const hasVerticalScroll = (nodeElement: NodeType): boolean => {
    if (!nodeElement) return false

    const overflowY = getComputedStyle(nodeElement).overflowY
    const hasYScroll = overflowY !== 'visible' && overflowY !== 'hidden'
    return (nodeElement.clientHeight === 0 ||
      nodeElement.scrollHeight <= nodeElement.clientHeight ||
      !hasYScroll)
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
    if (!elementRef || !elementRef.current) return null

    if (useParentScroll) {
      let parentNode = elementRef.current.parentNode as NodeType
      parentNode = getParentNode(parentNode)
      return parentNode as NodeType
    }

    return (elementRef.current as NodeType)
  }

  const callOnScrollEnd = () => {
    if (allowedOnScrollRef.current && onScrollEnd) onScrollEnd()
    allowedOnScrollRef.current = false
  }

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

    const isOverThreshold = scrollEndThreshold && Math.ceil(screenPercentage) >= scrollEndThreshold
    if (isOverThreshold) callOnScrollEnd()
  }

  const canScrollContent = (element: HTMLElement) => (
    direction === 'HORIZONTAL'
      ? element.scrollWidth > element.clientWidth
      : element.scrollHeight > element.clientHeight
  )

  useEffect(() => {
    if (!hasRendered) return
    allowedOnScrollRef.current = true
    const referenceNode = getReferenceNode()
    if (referenceNode !== node) {
      if (node !== undefined && node !== null) node.removeEventListener('scroll', calcPercentage)
      node = referenceNode

      const parent = (node && node.nodeName !== 'HTML') ? node : window

      if (!canScrollContent(parent instanceof Window ? document.body : parent)) callOnScrollEnd()

      parent.addEventListener('scroll', calcPercentage)
      return () => parent.removeEventListener('scroll', calcPercentage)
    }
  }, deps)
}

export default useScroll
