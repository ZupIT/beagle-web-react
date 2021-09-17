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

import { FC, useState, useEffect, useContext, useMemo, ReactElement } from 'react'
import {
  BeagleView,
  DefaultWebNavigator,
} from '@zup-it/beagle-web'
import BeagleProvider from './provider'

function useNavigator(widgetBuilder: (view: BeagleView) => ReactElement) {
  const beagleService = useContext(BeagleProvider)
  const [currentWidget, setCurrentWidget] = useState<ReactElement | null>(null)

  if (!beagleService) throw Error('Couldn\'t find a BeagleProvider in the component tree!')

  const navigator = useMemo(() => DefaultWebNavigator.create(beagleService, widgetBuilder), [])

  useEffect(() => {
    navigator.onChange((widget) => {
      console.log('Navigator changed with', widget.key)
      setCurrentWidget(widget)
    })
  }, [])

  return {
    navigator,
    currentWidget,
  }
}

export default useNavigator
