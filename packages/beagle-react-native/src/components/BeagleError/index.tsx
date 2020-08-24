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

import React, { FC } from 'react'
import BeagleText from '../BeagleText'
import { BeagleDefaultComponent } from '../../../../beagle-react/src/components/types'
import { SafeAreaView } from 'react-native'

const BeagleError: FC<BeagleDefaultComponent> = props => {
  return (
    <SafeAreaView>
      <BeagleText text="Sorry!" textColor="#CF0000" />
      <BeagleText text="An unexpected error happened while loading your page." />
    </SafeAreaView>
  )
}

export default BeagleError