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
import { Tree } from '@zup-it/beagle-web'
import withTheme from '../utils/withTheme'
import useScroll from './scroll'
import { StyledListView } from './styled'
import { BeagleListViewInterface } from './types'

const BeagleListView: FC<BeagleListViewInterface> = ({
  direction = 'VERTICAL',
  className,
  style,
  template,
  onInit,
  onScrollEnd,
  scrollEndThreshold = 100,
  dataSource,
  iteratorName = 'item',
  beagleContext,
  children,
  useParentScroll = false,
}) => {
  const elementRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const { allowOnScrollEnd } = useScroll(
    { elementRef, direction, onScrollEnd, scrollEndThreshold, useParentScroll },
    [children],
  )

  useEffect(() => {
    if (onInit) onInit()
  }, [])

  useEffect(() => {
    if (!Array.isArray(dataSource)) return
    const element = beagleContext.getElement() as BeagleUIElement
    if (!element) return

    element.children = dataSource.map((item, index) => {
      const child = Tree.clone(template)
      child._implicitContexts_ = [{ id: iteratorName, value: item }]
      child.id = `${beagleContext.getElement().id}_${index}`
      return child
    })

    beagleContext.getView().getRenderer().doFullRender(element, element.id)
    allowOnScrollEnd()
  }, [JSON.stringify(dataSource)])

  return (
    <StyledListView
      ref={elementRef}
      className={className}
      direction={direction}
      useParentScroll={useParentScroll}
      style={style}
    >
      {children}
    </StyledListView>
  )
}

export default withTheme(BeagleListView)
