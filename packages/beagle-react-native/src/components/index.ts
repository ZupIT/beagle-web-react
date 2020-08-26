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

import BeagleText from "./BeagleText"
import BeagleError from "./BeagleError"
import BeagleContainer from "./BeagleContainer"
import BeagleImage from "./BeagleImage"
import BeagleButton from "./BeagleButton"
import BeagleLoading from "./BeagleLoading"
import BeagleListView from "./BeagleListView"
import BeagleModal from "./BeagleModal"
import BeagleTextInput from "./BeagleInput"
import BeagleTextArea from "./BeagleTextArea"



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
  'beagle:textInput':BeagleTextInput,
  'beagle:text-area': BeagleTextArea
}

const webSpecificComponents = {
  'custom:modal': BeagleModal
}


export default {
  ...libRequiredComponents,
  ...beagleDefaultComponents,
  ...webSpecificComponents
}
