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

import React, { FC, useEffect, useRef, Children } from 'react'
import { BeagleUIElement } from '@zup-it/beagle-web'
import { Tree, logger } from '@zup-it/beagle-web'
import withTheme from '../../utils/withTheme'
import useScroll from './scroll'
import { StyledDynamicViewsInterface } from './styled'
import { BeagleGridViewInterface, BeagleListViewInterface, DynamicListCoreInterface } from '../../../../../common/models'
import { buildAccessibility } from '../../../../../common/utils/accessibility'


interface DynamicViewInterface extends BeagleListViewInterface, BeagleGridViewInterface{}

const DynamicListCoreComponent: FC<DynamicViewInterface> = ({
  direction = 'VERTICAL',
  className,
  style,
  template,
  onInit,
  onScrollEnd,
  scrollEndThreshold = 100,
  dataSource,
  iteratorName = 'item',
  viewContentManager,
  children,
  useParentScroll = false,
  _key,
  __suffix__,
  isScrollIndicatorVisible = true,
  accessibility,
  isGrid,
  numColumns
}) => {
  const elementRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const a11y = buildAccessibility(accessibility)
  const hasRendered = !Array.isArray(dataSource) || dataSource.length === Children.count(children)
  useScroll(
    { elementRef, direction, onScrollEnd, scrollEndThreshold, useParentScroll, hasRendered },
    [Children.count(children)],
  )

  useEffect(() => {
    if (onInit) onInit()
  }, [])

  useEffect(() => {
    if (!Array.isArray(dataSource)) return

    if (!viewContentManager) {
      return logger.error('The beagle:listView component should only be used inside a view rendered by Beagle.')
    }

    const element = viewContentManager.getElement() as BeagleUIElement
    if (!element) return
    const listViewTag = viewContentManager.getElement()._beagleComponent_.toLowerCase()
    const listViewId = viewContentManager.getElement().id

    element.children = dataSource.map((item, index) => {
      const templateTree = Tree.clone(template)
      const iterationKey = _key && item[_key] !== undefined ? item[_key] : index
      const suffix = __suffix__ || ''
      templateTree._implicitContexts_ = [{ id: iteratorName, value: item }]
      Tree.forEach(templateTree, (component, componentIndex) => {
        const baseId = component.id ? `${component.id}${suffix}` : `${listViewId}:${componentIndex}`
        component.id = `${baseId}:${iterationKey}`
        if (component._beagleComponent_.toLowerCase() === listViewTag) {
          component.__suffix__ = `${suffix}:${iterationKey}`
        }
      })

      return templateTree
    })

    viewContentManager.getView().getRenderer().doFullRender(element, element.id)
  }, [JSON.stringify(dataSource)])

  return (
    <StyledDynamicViewsInterface
      ref={elementRef}
      className={className}
      direction={direction}
      useParentScroll={useParentScroll}
      style={style}
      isScrollIndicatorVisible={isScrollIndicatorVisible}
      numColumns={numColumns}
      isGrid={isGrid}
      {
      ...({
        [direction === 'VERTICAL' ?
          'aria-rowcount' : 'aria-colcount']: Children.count(children) || 0
      })
      }
      {...a11y}
    >
      {children}
    </StyledDynamicViewsInterface>
  )
}

export default withTheme(DynamicListCoreComponent)
