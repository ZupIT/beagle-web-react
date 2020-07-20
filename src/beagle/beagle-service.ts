import ContentStart  from 'components/ContentStart';
import  ContentPage  from 'components/ContentPage';
import { createBeagleUIService } from '@zup-it/beagle-react'


export default createBeagleUIService({
  baseUrl: "src/beagle/",
  components: {
    "custom:ContentPage": ContentPage,
    "custom:ContentStart": ContentStart
  }
})