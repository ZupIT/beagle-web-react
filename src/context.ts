import { BeagleUIElement, IdentifiableBeagleUIElement } from '@zup-it/beagle-web'
import { DataContext } from './types'

export function getContextHierarchy(
  element: BeagleUIElement,
  currentHierarchy: DataContext[] = [],
) {
  return element._context_ ? [element._context_, ...currentHierarchy] : currentHierarchy
}

export function getContextHierarchyByElementId(
  tree: IdentifiableBeagleUIElement,
  elementId: string,
  contextHierarchy?: DataContext[],
): DataContext[] | undefined {
  const hierarchy = getContextHierarchy(tree, contextHierarchy)
  if (tree.id === elementId) return hierarchy
  if (!tree.children) return
  for (let i = 0; i < tree.children.length; i++) {
    const result = getContextHierarchyByElementId(tree.children[i], elementId, hierarchy)
    if (result) return result
  }
}

export function getContextInHierarchy(contextHierarchy: DataContext[], contextId?: string) {
  return contextId
    ? contextHierarchy.find(({ id }) => id === contextId)
    : contextHierarchy[0]
}
