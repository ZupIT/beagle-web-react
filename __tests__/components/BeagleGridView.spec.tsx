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
import 'jest-styled-components'
import Adapter from 'enzyme-adapter-react-16'
import { configure, shallow } from 'enzyme'
import BeagleGridView from 'components/BeagleDynamicLists/BeagleGridView'

let wrapper: any
const mockStyle: React.CSSProperties = {
  height: '100',
  width: '50',
}

configure({ adapter: new Adapter() })
beforeAll(() => {
  wrapper = shallow(<BeagleGridView
    style={mockStyle}
    dataSource={['testA', 'testB', 'testC']}
    templates={[{
      view: {
        _beagleComponent_: 'beagle:container',
        children: [
          {
            _beagleComponent_: 'beagle:text',
            text: '@item'
          }
        ],
      },
    }]}
    className='Test Class' />)
})

test('Beagle snapshot grid view', () => {
  expect(wrapper).toMatchSnapshot()
})
