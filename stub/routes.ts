import { ServerRoute } from 'hapi'
import { getDemo } from './model'

const loadDemo: ServerRoute = {
  method: 'GET',
  path: '/projects',
  handler: getDemo,
}

export default [
  loadDemo,
]
