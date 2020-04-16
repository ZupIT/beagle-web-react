/*
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
*/

import get from 'lodash/get'
import { DataContext } from './types'

const bindingRegex = /\$\{([^\}]+)\}/g
const fullBindingRegex = /^\$\{([^\}]+)\}$/

function getBindingValue(
  path: string,
  contextHierarchy: DataContext[],
) {
  const pathMatch = path.match(/^([^\.]+)\.?(.*)/)
  if (!pathMatch || pathMatch.length < 1) return
  const contextId = pathMatch[1]
  const contextPath = pathMatch[2]
  const context = contextHierarchy.find(({ id }: DataContext) => id === contextId)
  if (!context) return
  
  return contextPath ? get(context.value, contextPath) : context.value
}

function replaceBindingsInString(str: string, contextHierarchy: DataContext[]) {
  const fullMatch = str.match(fullBindingRegex)
  if (fullMatch) {
    const bindingValue = getBindingValue(fullMatch[1], contextHierarchy)
    return bindingValue === undefined ? str : bindingValue
  }

  return str.replace(bindingRegex, (bindingStr, path) => {
    const bindingValue = getBindingValue(path, contextHierarchy)
    return bindingValue === undefined ? bindingStr : JSON.stringify(bindingValue)
  })
}

export function replaceBindings(
  data: any,
  contextHierarchy: DataContext[] = [],
): any {
  if (typeof data === 'string') return replaceBindingsInString(data, contextHierarchy)

  if (data instanceof Array) return data.map(item => replaceBindings(item, contextHierarchy))

  if (typeof data === 'object') {
    const hierarchy = data._context_ ? [data._context_, ...contextHierarchy] : contextHierarchy
    const ignore = ['id', '_beagleType_', '_context_']

    return Object.keys(data).reduce((result, key) => ({
      ...result,
      [key]: ignore.includes(key) ? data[key] : replaceBindings(data[key], hierarchy),
    }), {})
  }

  return data
}
