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

import BeagleButtonComponent from '../components/BeagleButton'
import BeagleTextComponent from '../components/BeagleText'
import BeagleContainerComponent from '../components/BeagleContainer'
import BeagleLoadingComponent from '../components/BeagleLoading'
import BeagleErrorComponent from '../components/BeagleError'
import BeagleImageComponent from '../components/BeagleImage'
import BeagleListViewComponent from '../components/BeagleListView'
import BeagleTouchableComponent from '../components/BeagleTouchable'

export default {
  'beagle:component:button': BeagleButtonComponent,
  'beagle:component:text': BeagleTextComponent,
  'beagle:component:listview': BeagleListViewComponent,
  'beagle:component:container': BeagleContainerComponent,
  'beagle:component:screencomponent': BeagleContainerComponent,
  'beagle:component:pageview': null,
  'beagle:component:networkimage': BeagleImageComponent,
  'beagle:component:image': BeagleImageComponent,
  'beagle:component:tabview': null,
  'beagle:component:tabitem': null,
  'beagle:component:scrollview': BeagleContainerComponent,
  'beagle:component:touchable': BeagleTouchableComponent,
  error: BeagleErrorComponent,
  loading: BeagleLoadingComponent,
}
