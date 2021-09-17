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

import React, { FC, MutableRefObject, ReactElement, useEffect, createElement } from 'react'
import { BeagleNavigator, BeagleView } from '@zup-it/beagle-web'
import useNavigator from 'common/useNavigator'
import BeagleWidget from './beagle-widget'

interface Props {
  navigatorRef?: MutableRefObject<BeagleNavigator<ReactElement> | undefined>,
}

let nextKey = 0

const widgetBuilder = (view: BeagleView) => {
  const id = `beagle-navigator-widget:${++nextKey}`
  return <BeagleWidget key={id} id={id} view={view} />
}

const BeagleNavigator: FC<Props> = ({ navigatorRef }) => {
  const { navigator, currentWidget } = useNavigator(widgetBuilder)
  useEffect(() => {
    if (navigatorRef) navigatorRef.current = navigator
  }, [navigator])

  return currentWidget
}

export default BeagleNavigator
