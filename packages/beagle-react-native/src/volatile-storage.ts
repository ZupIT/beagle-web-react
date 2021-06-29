import { BeagleStorage } from '@zup-it/beagle-web'

export function createVolatileStorage(): BeagleStorage {
  let storage: Record<string, string> = {}

  return {
    clear: () => storage = {},
    getItem: key => storage[key] || null,
    removeItem: key => delete storage[key],
    setItem: (key, value) => storage[key] = value,
  }
}
