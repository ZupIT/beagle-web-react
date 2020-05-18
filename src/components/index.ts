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

import Button from './BeagleButton'
import Container from './BeagleContainer'
import Error from './BeagleError'
import Image from './BeagleImage'
import ListView from './BeagleListView'
import Loading from './BeagleLoading'
import Text from './BeagleText'

export default {
  'beagle:component:button': Button,
  'beagle:component:text': Text,
  'beagle:component:listview': ListView,
  'beagle:component:container': Container,
  'beagle:component:screencomponent': null,
  'beagle:component:pageview': null,
  'beagle:component:networkimage': Image,
  'beagle:component:image': Image,
  'beagle:component:tabview': null,
  'beagle:component:tabitem': null,
  'beagle:component:scrollview': null,
  error: Error,
  loading: Loading,
}
