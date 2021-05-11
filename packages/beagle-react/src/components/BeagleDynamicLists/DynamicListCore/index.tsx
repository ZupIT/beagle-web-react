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
import { BeagleGridViewInterface, BeagleListViewInterface } from '../../../../../common/models'
import { buildAccessibility } from '../../../../../common/utils/accessibility'
import useScroll from './scroll'
import { StyledDynamicViewsInterface } from './styled'


interface DynamicViewInterface extends BeagleListViewInterface, BeagleGridViewInterface { }

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
  numColumns,
  listType,
}) => {

  const elementRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const a11y = buildAccessibility(accessibility)
  const hasRendered = !Array.isArray(dataSource) || dataSource.length === Children.count(children)
  useScroll(
    { elementRef, direction, onScrollEnd, scrollEndThreshold, useParentScroll, hasRendered },
    [Children.count(children)],
  )

  const setTemplateWidthIfGrid = () => {
    if (listType === 'LIST') return
    if (!template.style) template.style = {}
    const currentWidth = template.style.size && template.style.size.width
    const customWidth = numColumns && document.body.clientWidth / numColumns
    template.style.size = {
      ...template.style.size,
      width: currentWidth || { value: customWidth, type: 'REAL' },
    }
  }

  useEffect(() => {
    if (onInit) onInit()
    setTemplateWidthIfGrid()
  }, [])

  useEffect(() => {
    if (!Array.isArray(dataSource)) return

    if (!viewContentManager) {
      return logger.error('The beagle:listView component should only be used inside a view rendered by Beagle.')
    }

    const DYNAMIC_COMPONENTS = ['beagle:listview', 'beagle:gridview']
    const element = viewContentManager.getElement() as BeagleUIElement
    if (!element) return
    const componentTag = viewContentManager.getElement()._beagleComponent_.toLowerCase()
    const listViewId = viewContentManager.getElement().id

    element.children = dataSource.map((item, index) => {
      const templateTree = Tree.clone(template)
      const iterationKey = _key && item[_key] !== undefined ? item[_key] : index
      const suffix = __suffix__ || ''
      templateTree._implicitContexts_ = [{ id: iteratorName, value: item }]
      Tree.forEach(templateTree, (component, componentIndex) => {
        const baseId = component.id ? `${component.id}${suffix}` : `${listViewId}:${componentIndex}`
        component.id = `${baseId}:${iterationKey}`
        if (DYNAMIC_COMPONENTS.includes(componentTag)) {
          component.__suffix__ = `${suffix}:${iterationKey}`
        }
      })

      return templateTree
    })

    viewContentManager.getView().getRenderer().doFullRender(element, element.id)
  }, [JSON.stringify(dataSource)])

  const getAriaCount = () => {
    if (listType === 'LIST')
      return {
        [direction === 'VERTICAL' ? 'aria-rowcount' :
          'aria-colcount']: Children.count(children) || 0,
      }

    if (listType === 'GRID' && numColumns)
      return {
        'aria-rowcount': Math.ceil(Children.count(children) / numColumns),
        'aria-colcount': numColumns,
      }
  }

  return (
    <StyledDynamicViewsInterface
      ref={elementRef}
      className={className}
      direction={direction}
      useParentScroll={useParentScroll}
      style={style}
      isScrollIndicatorVisible={isScrollIndicatorVisible}
      numColumns={numColumns}
      listType={listType}
      {
        ...(getAriaCount())
      }
      {...a11y}
    >
      {children}
    </StyledDynamicViewsInterface>
  )
}

export default withTheme(DynamicListCoreComponent)
