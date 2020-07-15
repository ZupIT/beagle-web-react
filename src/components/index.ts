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

import BeagleButton from './BeagleButton'
import BeagleText from './BeagleText'
import BeagleContainer from './BeagleContainer'
import BeagleLoading from './BeagleLoading'
import BeagleError from './BeagleError'
import BeagleImage from './BeagleImage'
import BeagleListView from './BeagleListView'
import BeagleLazy from './BeagleLazy'
import BeagleTouchable from './BeagleTouchable'
import BeagleSimpleForm from './BeagleSimpleForm'
import BeagleTabView from './BeagleTabView'
import BeagleTabItem from './BeagleTabView/BeagleTabItem'
import BeaglePageView from './BeaglePageView'
import Markdown from './Markdown'
import Modal from './Modal'
import TextArea from './TextArea'
import BeagleInput from './BeagleInput'
import BeagleWebView from './BeagleWebView'

const libRequiredComponents = {
  'custom:error': BeagleError,
  'custom:loading': BeagleLoading,
}

const beagleDefaultComponents = {
  'beagle:button': BeagleButton,
  'beagle:text': BeagleText,
  'beagle:listview': BeagleListView,
  'beagle:container': BeagleContainer,
  'beagle:screencomponent': BeagleContainer,
  'beagle:pageview': BeaglePageView,
  'beagle:networkimage': BeagleImage,
  'beagle:image': BeagleImage,
  'beagle:tabview': BeagleTabView,
  'beagle:tabitem': BeagleTabItem,
  'beagle:scrollview': BeagleContainer,
  'beagle:touchable': BeagleTouchable,
  'beagle:simpleform': BeagleSimpleForm,
  'beagle:lazycomponent': BeagleLazy,
  'beagle:textInput': BeagleInput,
  'beagle:webview': BeagleWebView,
}

const webSpecificComponents = {
  'custom:markdown': Markdown,
  'custom:modal': Modal,
  'custom:text-area': TextArea,
}

export default {
  ...libRequiredComponents,
  ...beagleDefaultComponents,
  ...webSpecificComponents,
}
