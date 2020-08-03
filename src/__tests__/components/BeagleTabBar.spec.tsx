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

// Link.react.test.js
import * as React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import mock from 'jest-mock-extended/lib/Mock'
import BeagleTabBar, { ItemTitle } from '../../components/BeagleTabBar'
import { BeagleContext } from '../../types'

let beagleContextMock: any
let wrapper: any
let onTabSelectionMock: any
const itemTitleMock: ItemTitle[] = [{ title:'Title A' }, { title:'Title B' }, { title:'Title C' }]

configure({ adapter: new Adapter() })
beforeAll(() => {
  beagleContextMock = mock<BeagleContext>()
  onTabSelectionMock = jest.fn(()=>'submited')
  wrapper = mount(<BeagleTabBar 
    items={itemTitleMock} 
    beagleContext={beagleContextMock} 
    onTabSelection={onTabSelectionMock}/>)
})

test('Beagle snapshot TabBar', () => {
  expect(wrapper).toMatchSnapshot()
})
