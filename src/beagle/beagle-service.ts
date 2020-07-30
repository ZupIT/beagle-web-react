import BackgroundContainer  from 'components/BackgroundContainer';
import BeagleTabBar from 'components/BeagleTabBar'
import Icon from 'components/IconImage'
import { createBeagleUIService } from '@zup-it/beagle-react'
import Select from 'components/Select'

export default createBeagleUIService({
  baseUrl: "src/beagle/",
  components: {

    "custom:BackgroundContainer": BackgroundContainer,
    "beagle:TabBar": BeagleTabBar,
    "custom:Icon": Icon,
    "custom:Select": Select
  }
})