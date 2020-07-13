import { createBeagleUIService } from '@zup-it/beagle-react'

export default createBeagleUIService({
  baseUrl: process.env.REACT_APP_BASE_URL ?? "",
  components: {}
})