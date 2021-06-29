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
import { BeagleUIElement, DataContext, IdentifiableBeagleUIElement } from '@zup-it/beagle-web'
import { logger } from '@zup-it/beagle-web'
import { TemplateManager } from '@zup-it/beagle-web/beagle-view/template-manager/types'
import withTheme from '../utils/withTheme'
import { buildAccessibility } from '../../../../common/utils/accessibility'
import useScroll from './scroll'
import { StyledListView } from './styled'
import { BeagleListViewInterface } from './types'

const BeagleListView: FC<BeagleListViewInterface> = ({
  direction = 'VERTICAL',
  className,
  style,
  template,
  templates,
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
    if (!element) return logger.error('The beagle:listView element was not found.')

    if (!template && !templates) return logger.error('The beagle:listView requires a template or multiple templates to be rendered!')

    const deprecatedTemplate = { case: false, view: template }
    const templateItems = [...templates || [], deprecatedTemplate].filter(t => t.view) as { 
      case: boolean, 
      view: BeagleUIElement<Record<string, Record<string, any>>>, 
    }[]
    const defaultTemplate = templateItems.find(t => !t.case)
    const manageableTemplates = templateItems.filter(t => t.case) || []
    const suffix = __suffix__ || ''
    const renderer = viewContentManager.getView().getRenderer()
    const manager: TemplateManager = {
      default: defaultTemplate && defaultTemplate.view,
      templates: manageableTemplates,
    }
    const componentManager = (component: IdentifiableBeagleUIElement, index: number) => {
      const iterationKey = _key && dataSource[index][_key] ? dataSource[index][_key] : index
      const baseId = component.id ? `${component.id}${suffix}` : `${element.id}:${index}`
      return {
        id: `${baseId}:${iterationKey}`,
        key: iterationKey,
        __suffix__: `${suffix}:${iterationKey}`,
      }
    }
    const contexts: DataContext[][] = dataSource.map(item => [{ id: iteratorName, value: item }])
    renderer.doTemplateRender(manager, element.id, contexts, componentManager)
  }, [JSON.stringify(dataSource)])

  return (
    <StyledListView
      ref={elementRef}
      className={className}
      direction={direction}
      useParentScroll={useParentScroll}
      style={style}
      isScrollIndicatorVisible={isScrollIndicatorVisible}
      {
        ...({ [direction === 'VERTICAL' ? 
          'aria-rowcount' : 'aria-colcount']: Children.count(children) || 0 })
      }
      {...a11y}
    >
      {children}
    </StyledListView>
  )
}

export default withTheme(BeagleListView)
