/*
  * Copyright 2020, 2022 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
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

import React, { FC, useEffect, useRef, Children, useMemo, useState } from 'react'
import { BeagleUIElement, ImplicitDataContext, TemplateManagerItem, Tree } from '@zup-it/beagle-web'
import { isContextExpression } from '@zup-it/beagle-web/utils/expression'
import setContext from '@zup-it/beagle-web/action/set-context'
import { logger } from '@zup-it/beagle-web'
import { TemplateManager } from '@zup-it/beagle-web'
import { BeagleGridViewInterface, BeagleListViewInterface } from 'models'
import { buildAccessibility } from 'utils/accessibility'
import withTheme from 'components/utils/withTheme'
import useScroll from './scroll'
import { StyledDynamicViewsInterface } from './styled'

interface DynamicViewInterface extends BeagleListViewInterface, BeagleGridViewInterface {
  listType: 'GRID' | 'LIST',
}

const DynamicListCoreComponent: FC<DynamicViewInterface> = ({
  direction = 'VERTICAL',
  className,
  style,
  onInit,
  onScrollEnd,
  scrollEndThreshold = 100,
  dataSource,
  iteratorName = 'item',
  indexName = 'index',
  viewContentManager,
  children,
  useParentScroll = false,
  _key,
  __suffix__,
  isScrollIndicatorVisible = true,
  accessibility,
  spanCount,
  listType,
}) => {
  const elementRef = useRef() as React.MutableRefObject<HTMLDivElement>
  const a11y = buildAccessibility(accessibility)
  const [shouldRenderDataSource, setShouldRenderDataSource] = useState<boolean>(true)
  const hasRendered = !Array.isArray(dataSource) || dataSource.length === Children.count(children)
  const templatesRaw: BeagleListViewInterface['templates'] = useMemo(() =>
    viewContentManager ? viewContentManager.getElement().templates : undefined, []
  )
  const isVertical = () => direction === 'VERTICAL'
  const isGrid = () => listType === 'GRID'
  const isList = () => listType === 'LIST'

  useScroll(
    { elementRef, direction, onScrollEnd, scrollEndThreshold, useParentScroll, hasRendered },
    [Children.count(children)],
  )

  useEffect(() => {
    if (onInit && !viewContentManager?.getState('hasLoaded')) {
      viewContentManager?.setState('hasLoaded', true)
      onInit()
    }    
  }, [])

  useEffect(() => {
    if (!shouldRenderDataSource) {
      setShouldRenderDataSource(true)
      return
    }

    if (!Array.isArray(dataSource)) return

    if (!viewContentManager) {
      return logger.error('The beagle:listView component should only be used inside a view rendered by Beagle.')
    }

    const element = viewContentManager.getElement() as BeagleUIElement
    if (!element) return logger.error('The beagle:listView element was not found.')

    const hasAnyTemplate = (templatesRaw && Array.isArray(templatesRaw) && templatesRaw.length)
    if (!hasAnyTemplate) {
      return logger.error('The beagle:listView requires a template or multiple templates to be rendered!')
    }

    const componentTag = element._beagleComponent_.toLowerCase()
    const templateItems = (templatesRaw || []) as TemplateManagerItem[]
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

    const getBaseId = (component: BeagleUIElement, componentIndex: number, suffix: string) =>
      component.id ? `${component.id}${suffix}` : `${element.id}:${componentIndex}`
        
    const componentManager = (component: BeagleUIElement, index: number): BeagleUIElement => {
      Tree.forEach(component, (treeComponent, componentIndex) => {
        const iterationKey = getIterationKey(index)
        const baseId = getBaseId(treeComponent, componentIndex, suffix)
        const hasSuffix = ['beagle:listview', 'beagle:gridview'].includes(componentTag)
        treeComponent.id = `${baseId}:${iterationKey}`
        if (hasSuffix) treeComponent.__suffix__ = `${suffix}:${iterationKey}`
      })
      return component
    }

    const beagleView = viewContentManager.getView()
    const anchorElement = Tree.findById(beagleView.getTree(), element.id)
    const dataSourceInfo = isContextExpression(anchorElement!['dataSource'], beagleView)
    const contexts: ImplicitDataContext[][] = dataSource.map((item, index) => [{
      id: iteratorName,
      value: item,
      ...(dataSourceInfo.isContext
        ? {
          onChange: (newValue: any) => {
            const { contextId, contextPath } = dataSourceInfo
            dataSource[index] = newValue    
            setShouldRenderDataSource(false)      
            setContext({
              action: {
                _beagleAction_: 'beagle:setContext',
                contextId: contextId,
                ...(contextPath ? { path: contextPath } : {}),
                value: dataSource,
              },
              beagleView,
              element: anchorElement!,
              executeAction: () => {},
            })
          },
        }
        : {}
      ),      
    }]) 

    renderer.doTemplateRender(manager, element.id, contexts, indexName, componentManager)
  }, [JSON.stringify(dataSource)])

  const getAriaCount = () => {
    const getChildrenCount = () => Children.count(children) || 0
    const getCalcSpanCount = () => Math.ceil(getChildrenCount() / spanCount!)
    const getListProps = () => ({
      [`aria-${isVertical() ? 'row' : 'col'}count`]: getChildrenCount(),
    })
    const getGridProps = () => ({
      'aria-rowcount': direction === 'HORIZONTAL' ? spanCount : getCalcSpanCount(),
      'aria-colcount': direction === 'VERTICAL' ? spanCount : getCalcSpanCount(),
    })

    if (isList()) return getListProps()
    else if (isGrid() && spanCount) return getGridProps()
    else return {}
  }

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
