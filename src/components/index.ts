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

import BeagleButtonComponent from './BeagleButton'
import BeagleTextComponent from './BeagleText'
import BeagleContainerComponent from './BeagleContainer'
import BeagleLoadingComponent from './BeagleLoading'
import BeagleErrorComponent from './BeagleError'
import BeagleImageComponent from './BeagleImage'
import BeagleListViewComponent from './BeagleListView'
import Form from './Form'
import LinkList from './LinkList'
import Modal from './Modal'
import TextArea from './TextArea'
import TextInput from './TextInput'

const libRequiredComponents = {
  error: BeagleErrorComponent,
  loading: BeagleLoadingComponent,
}

const beagleDefaultComponents = {
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
