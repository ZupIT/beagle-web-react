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

import BeagleText from './BeagleText'
import BeagleError from './BeagleError'
import BeagleContainer from './BeagleContainer'
import BeagleImage from './BeagleImage'
import BeagleButton from './BeagleButton'
import BeagleLoading from './BeagleLoading'
import BeagleListView from './BeagleListView'
import BeagleTextInput from './BeagleInput'
import BeagleTouchable from './BeagleTouchable'
import BeagleTabBar from './BeagleTabBar'
import BeaglePageView from './BeaglePageView'
import BeagleLazy from './BeagleLazy'
import BeagleSimpleForm from './BeagleSimpleForm'
import BeagleWebView from './BeagleWebView'
import BeagleScrollView from './BeagleScrollView'

const libRequiredComponents = {
  'custom:error': BeagleError,
  'custom:loading': BeagleLoading,
}

const beagleDefaultComponents = {
  'beagle:text': BeagleText,
  'beagle:container': BeagleContainer,
  'beagle:image': BeagleImage,
  'beagle:button': BeagleButton,
  'beagle:listview': BeagleListView,
  'beagle:textInput': BeagleTextInput,
  'beagle:touchable': BeagleTouchable,
  'beagle:tabbar': BeagleTabBar,
  'beagle:pageview': BeaglePageView,
  'beagle:lazycomponent': BeagleLazy,
  'beagle:simpleform': BeagleSimpleForm,
  'beagle:webview': BeagleWebView,
  'beagle:screencomponent': BeagleContainer,
  'beagle:scrollview': BeagleScrollView,
}


export default {
  ...libRequiredComponents,
  ...beagleDefaultComponents,
}
