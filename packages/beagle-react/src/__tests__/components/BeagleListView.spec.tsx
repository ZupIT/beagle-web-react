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
import BeagleListView from '../../components/BeagleDynamicLists/BeagleListView'
import { Direction } from 'common/models'

let wrapper: any
const directionMock: Direction = 'HORIZONTAL'
const mockStyle: React.CSSProperties = {
  height: '100',
  width: '50',
}

configure({ adapter: new Adapter() })

/**
 * @deprecated since v1.7.0 Will be removed in 2.0. Use templates instead.
 */
describe('Render BeagleListView with template', () => {
  beforeAll(() => {
    wrapper = shallow(
      <BeagleListView
        direction={directionMock}
        style={mockStyle}
        dataSource={['testA', 'testB', 'testC']}
        template={{ _beagleComponent_: 'beagle:text', text: '@item' }}
        className="Test Class"
      />
    )
  })
  
  test('Beagle snapshot list view', () => {
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Render BeagleListView with multiple templates', () => {
  const dataSource = [
    { key: 'first', text: 'First Child' },
    { key: 'second', text: 'Second Child' },
    { key: 'third', text: 'First Child' },
    { key: 'unknown', text: 'Unknown Child' },
  ]

  const templates = [
    {
      case: "@{eq(item.key, 'first')}",
      view: {
        _beagleComponent_: 'beagle:container',
        id: `first-child`,
        children: [
          {
            _beagleComponent_: 'beagle:textInput',
            id: `first-text`,
            value: 'first',
          }
        ],
      },
    },
    {
      case: "@{eq(item.key, 'second')}",
      view: {
        _beagleComponent_: 'beagle:textInput',
        id: `second-child`,
        value: 'second',
      },
    },
    {
      case: "@{eq(item.key, 'third')}",
      view: {
        _beagleComponent_: 'beagle:container',
        id: `third-child`,
        children: [
          {
            _beagleComponent_: 'beagle:textInput',
            id: `third-label`,
            value: `third label`,
          },
          {
            _beagleComponent_: 'beagle:input',
            id: `third-input`,
            value: `third input`,
          }
        ],
      },
    },
    {
      case: false,
      view: {
        _beagleComponent_: 'beagle:textInput',
        id: `default-child`,
        value: 'default',
      },
    },
  ]

  beforeAll(() => {
    wrapper = shallow(
      <BeagleListView
        direction={directionMock}
        style={mockStyle}
        dataSource={dataSource}
        templates={templates}
        className="Test Class"
      />
    )
  })
  
  test('Beagle snapshot list view', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
