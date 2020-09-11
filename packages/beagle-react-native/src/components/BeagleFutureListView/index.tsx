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

import React, { FC, useEffect } from 'react'
import { BeagleFutureListViewInterface } from 'common/models'
import { ScrollView, StyleSheet } from 'react-native'
import { Tree, logger, BeagleUIElement } from '@zup-it/beagle-web'

const BeagleFutureListView: FC<BeagleFutureListViewInterface> = ({
  dataSource,
  direction,
  template,
  __suffix__,
  _key,
  children,
  className,
  iteratorName = 'item',
  onInit,
  onScrollEnd,
  scrollEndThreshold,
  style,
  useParentScroll,
  viewContentManager
}) => {
  const horizontal = direction && direction === 'HORIZONTAL'
  const styleSheet = StyleSheet.create({
    fromBffStyles: {
      ...style,
    },
    defaultStyles: {
      flex: style && style.flex ? Number(style.flex) : 1,
      borderWidth: 1,
      borderColor: '#000000',
      borderStyle: 'solid',
    },
  })

  useEffect(() => {
    onInit && onInit()
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
    <ScrollView
      style={
        {
          ...styleSheet.defaultStyles,
          ...styleSheet.fromBffStyles,
        }}
      horizontal={horizontal}>
      {children}
    </ScrollView>
  )
}

export default BeagleFutureListView
