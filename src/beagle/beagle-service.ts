import BackgroundContainer  from 'components/BackgroundContainer';
import BeagleTabBar from 'components/BeagleTabBar'
import Icon from 'components/IconImage'
import { createBeagleUIService } from '@zup-it/beagle-react'


export default createBeagleUIService({
  baseUrl: "src/beagle/",
  components: {

    "custom:BackgroundContainer": BackgroundContainer,
    "beagle:TabBar": BeagleTabBar,
    "custom:Icon": Icon
  }
})