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

import { 
  BeagleUIElement, 
  logger, 
  ViewContentManager,
  TemplateManager, 
  IdentifiableBeagleUIElement, 
  DataContext,
  TemplateManagerItem,
  Tree,
} from '@zup-it/beagle-web'
import { TemplateItem } from 'models'

export function renderListViewDynamicItems(
  dataSource: any[],
  viewContentManager?: ViewContentManager,
  template?: BeagleUIElement,
  templates?: TemplateItem[],
  _key?: string,
  __suffix__?: string,
  iteratorName = 'item') {
  if (!Array.isArray(dataSource)) return
  
  if (!viewContentManager) {
    return logger.error('The beagle:listView component should only be used inside a view rendered by Beagle.')
  }

  const element = viewContentManager.getElement() as BeagleUIElement
  if (!element) return logger.error('The beagle:listView element was not found.')

  if (!template && (!templates || !Array.isArray(templates) || templates.length === 0)) {
    return logger.error('The beagle:listView requires a template or multiple templates to be rendered!')
  }

  const componentTag = element._beagleComponent_.toLowerCase()
  const templateItems = [
    ...templates || [], 
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

  const getBaseId = (component: BeagleUIElement, componentIndex: number, suffix: string) => 
    component.id ? `${component.id}${suffix}` : `${element.id}:${componentIndex}`

  const componentManager = (component: BeagleUIElement, index: number): BeagleUIElement => {
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
}
