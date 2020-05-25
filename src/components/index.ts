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
  'beagle:component:button': BeagleButton,
  'beagle:component:text': BeagleText,
  'beagle:component:listview': BeagleListView,
  'beagle:component:container': BeagleContainer,
  'beagle:component:screencomponent': BeagleContainer,
  'beagle:component:pageview': null,
  'beagle:component:networkimage': BeagleImage,
  'beagle:component:image': BeagleImage,
  'beagle:component:tabview': null,
  'beagle:component:tabitem': null,
  'beagle:component:scrollview': BeagleContainer,
  'beagle:component:touchable': BeagleTouchable,
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
