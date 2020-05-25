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
  'beagle:button': BeagleButtonComponent,
  'beagle:text': BeagleTextComponent,
  'beagle:listview': BeagleListViewComponent,
  'beagle:container': BeagleContainerComponent,
  'beagle:screencomponent': BeagleContainerComponent,
  'beagle:pageview': null,
  'beagle:networkimage': BeagleImageComponent,
  'beagle:image': BeagleImageComponent,
  'beagle:tabview': null,
  'beagle:tabitem': null,
  'beagle:scrollview': BeagleContainerComponent,
  'beagle:touchable': BeagleTouchableComponent,
  error: BeagleErrorComponent,
  loading: BeagleLoadingComponent,
}
