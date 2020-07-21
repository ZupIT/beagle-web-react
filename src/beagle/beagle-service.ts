import BackgroundContainer  from 'components/BackgroundContainer';

import { createBeagleUIService } from '@zup-it/beagle-react'


export default createBeagleUIService({
  baseUrl: "src/beagle/",
  components: {

    "custom:BackgroundContainer": BackgroundContainer
  }
})