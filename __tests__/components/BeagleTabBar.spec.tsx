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

import React from 'react'
import 'jest-styled-components'
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount, shallow } from 'enzyme'
import BeagleTabBar from 'components/BeagleTabBar'
import {
  StyledBeagleTabItem,
  StyledSelected,
} from 'components/BeagleTabBar/styled'

let wrapper: any
let tabIndex: number

configure({ adapter: new Adapter() })

const setTabIndex = (e: number) => {
  tabIndex = e
}

const getComponent = () => (
  <BeagleTabBar
    items={[{ title: 'First Tab' }, { title: 'Second Tab' }]}
    currentTab={tabIndex}
    onTabSelection={setTabIndex}
  />
)

describe('Snapshot', () => {
  beforeAll(() => {
    wrapper = shallow(getComponent())
  })

  test('Beagle Tab Bar should render the tabs corretly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Tests', () => {
  beforeAll(() => {
    wrapper = mount(getComponent())
  })
  
  test('Beagle Tab Bar should toggle the tab', () => {
    let tabs = wrapper.find(StyledBeagleTabItem)
  
    expect(tabs.length).toBe(2)
    expect(tabs.at(0).exists(StyledSelected)).toBe(false)
    expect(tabs.at(1).exists(StyledSelected)).toBe(false)
  
    tabs.at(1).find('div').at(1).simulate('click')
    wrapper.setProps({ currentTab: tabIndex })
    tabs = wrapper.find(StyledBeagleTabItem)
    expect(tabs.at(0).exists(StyledSelected)).toBe(false)
    expect(tabs.at(1).exists(StyledSelected)).toBe(true)
  
    tabs.at(0).find('div').at(1).simulate('click')
    wrapper.setProps({ currentTab: tabIndex })
    tabs = wrapper.find(StyledBeagleTabItem)
    expect(tabs.at(0).exists(StyledSelected)).toBe(true)
    expect(tabs.at(1).exists(StyledSelected)).toBe(false)
  
    tabs.at(1).find('div').at(1).simulate('click')
    wrapper.setProps({ currentTab: tabIndex })
    tabs = wrapper.find(StyledBeagleTabItem)
    expect(tabs.at(0).exists(StyledSelected)).toBe(false)
    expect(tabs.at(1).exists(StyledSelected)).toBe(true)
  })
})
