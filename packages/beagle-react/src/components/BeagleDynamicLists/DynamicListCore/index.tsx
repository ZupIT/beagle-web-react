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

import React, { FC, useEffect, useRef, Children, useMemo } from 'react'
import { BeagleUIElement, DataContext, IdentifiableBeagleUIElement, TemplateManagerItem, Tree } from '@zup-it/beagle-web'
import { logger } from '@zup-it/beagle-web'
import { TemplateManager } from '@zup-it/beagle-web'
import withTheme from '../../utils/withTheme'
import { BeagleGridViewInterface, BeagleListViewInterface } from '../../../../../common/models'
import { buildAccessibility } from '../../../../../common/utils/accessibility'
import useScroll from './scroll'
import { StyledDynamicViewsInterface } from './styled'

interface DynamicViewInterface extends BeagleListViewInterface, BeagleGridViewInterface {
  listType: 'GRID' | 'LIST',
}

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
  spanCount,
  listType,
}) => {
  const elementRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const a11y = buildAccessibility(accessibility)
  const hasRendered = !Array.isArray(dataSource) || dataSource.length === Children.count(children)
  const templatesRaw: BeagleListViewInterface['templates'] = 
    useMemo(() => 
      viewContentManager ? viewContentManager.getElement().templates : undefined,
    [])

  const isVertical = () => direction === 'VERTICAL'
  const isGrid = () => listType === 'GRID'
  const isList = () => listType === 'LIST'
  
  spanCount = spanCount || numColumns

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
    if (!element) return logger.error('The beagle:listView element was not found.')

    const hasAnyTemplate = template || 
      (templatesRaw && Array.isArray(templatesRaw) && templatesRaw.length)
    if (!hasAnyTemplate) {
      return logger.error('The beagle:listView requires a template or multiple templates to be rendered!')
    }

    const componentTag = element._beagleComponent_.toLowerCase()
    const templateItems = [
      ...templatesRaw || [], 
      ...(template ? [{ view: template }] : []),
    ] as TemplateManagerItem[]
    const defaultTemplate = templateItems.find(t => t.case === undefined)
    const manageableTemplates = templateItems.filter(t => t.case) || []
    const suffix = __suffix__ || ''
    const renderer = viewContentManager.getView().getRenderer()
    const manager: TemplateManager = {
      default: defaultTemplate && defaultTemplate.view,
      templates: manageableTemplates,
    }

    const getIterationKey = (index: number) => 
      _key && dataSource[index][_key] ? dataSource[index][_key] : index

    const getBaseId = (
      component: IdentifiableBeagleUIElement, 
      componentIndex: number, 
      suffix: string,
    ) => component.id ? `${component.id}${suffix}` : `${element.id}:${componentIndex}`

    const componentManager = (component: IdentifiableBeagleUIElement, index: number) => {
      Tree.forEach(component, (treeComponent, componentIndex) => {
        const iterationKey = getIterationKey(index)
        const baseId = getBaseId(treeComponent, componentIndex, suffix)
        const hasSuffix = ['beagle:listview', 'beagle:gridview'].includes(componentTag)
        treeComponent.id = `${baseId}:${iterationKey}`
        if (hasSuffix) {
          treeComponent.__suffix__ = `${suffix}:${iterationKey}`
        }
      })
      return component
    }
    
    const contexts: DataContext[][] = dataSource.map(item => [{ id: iteratorName, value: item }])
    renderer.doTemplateRender(manager, element.id, contexts, componentManager)
  }, [JSON.stringify(dataSource)])

  const getAriaCount = () => ({
    ...((isList() && { 
      [`aria-${isVertical() ? 'row' : 'col'}count`]: Children.count(children) || 0,
    }) || {}),
    ...((isGrid() && numColumns && {
      'aria-rowcount': Math.ceil(Children.count(children) / numColumns),
      'aria-colcount': numColumns,
    }) || {}),
  })

  return (
    <StyledDynamicViewsInterface
      ref={elementRef}
      className={className}
      direction={direction}
      useParentScroll={useParentScroll}
      style={style}
      isScrollIndicatorVisible={isScrollIndicatorVisible}
      spanCount={spanCount}
      listType={listType}
      {...(getAriaCount())}
      {...a11y}
    >
      {children}
    </StyledDynamicViewsInterface>
  )
}

export default withTheme(DynamicListCoreComponent)
