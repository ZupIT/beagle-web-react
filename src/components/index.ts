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
import BeagleTouchable from './BeagleTouchable'
import Form from './Form'
import LinkList from './LinkList'
import Modal from './Modal'
import TextArea from './TextArea'
import TextInput from './TextInput'

const libRequiredComponents = {
  error: BeagleError,
  loading: BeagleLoading,
}

const beagleDefaultComponents = {
  'beagle:button': BeagleButton,
  'beagle:text': BeagleText,
  'beagle:listview': BeagleListView,
  'beagle:container': BeagleContainer,
  'beagle:screencomponent': BeagleContainer,
  'beagle:pageview': null,
  'beagle:networkimage': BeagleImage,
  'beagle:image': BeagleImage,
  'beagle:tabview': null,
  'beagle:tabitem': null,
  'beagle:scrollview': BeagleContainer,
  'beagle:touchable': BeagleTouchable,
}

const webSpecificComponents = {
  'form': Form,
  'link-list': LinkList,
  'modal': Modal,
  'text-area': TextArea,
  'text-input': TextInput,
}

export default {
  ...libRequiredComponents,
  ...beagleDefaultComponents,
  ...webSpecificComponents,  
}
