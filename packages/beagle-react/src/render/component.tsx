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

import React, { FC, MutableRefObject, ReactElement, useRef, useEffect } from 'react'
import { BeagleRemoteViewType } from 'common/types'
import { BeagleNavigator, RemoteView } from '@zup-it/beagle-web'
import BeagleReactNavigator from './beagle-navigator'

const BeagleRemoteView: FC<BeagleRemoteViewType> = (loadParams: BeagleRemoteViewType) => {
  const navigatorRef: MutableRefObject<BeagleNavigator<ReactElement> | undefined> = useRef()

  useEffect(() => {
    if (navigatorRef.current) {
      const remote: RemoteView = typeof loadParams.route === 'string'
        ? { url: loadParams.route }
        : loadParams.route
      navigatorRef.current.pushStack(remote, loadParams.controllerId)
    }
  }, [navigatorRef.current])
  
  return <BeagleReactNavigator navigatorRef={navigatorRef} />
}

export default BeagleRemoteView
