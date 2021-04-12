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
import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow } from 'enzyme'
import BeagleListView from '../../components/BeagleListView'
import { Direction } from 'common/models'
import 'jest-styled-components'

let wrapper: any
const directionMock: Direction = 'HORIZONTAL'
const mockStyle: React.CSSProperties = {
  height: '100',
  width: '50',
}

configure({ adapter: new Adapter() })
beforeAll(() => {
  wrapper = shallow(<BeagleListView 
    direction={directionMock} 
    style={mockStyle} 
    dataSource={['testA', 'testB', 'testC']}
    template={{ _beagleComponent_: 'beagle:text', text: '@item' }}
    className='Test Class' />)
})

test('Beagle snapshot list view', () => {
  expect(wrapper).toMatchSnapshot()
})
