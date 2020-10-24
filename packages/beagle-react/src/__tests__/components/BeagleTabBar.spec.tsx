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
import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
import BeagleTabBar from '../../components/BeagleTabBar'

let wrapper: any
let tabIndex: number
const setTabIndex = (e: number) => tabIndex = e

configure({ adapter: new Adapter() })

beforeAll(() => {
  wrapper = mount(
    <BeagleTabBar
      items={[{ title: 'First Tab' }, {title: 'Second Tab'}]}
      currentTab={tabIndex}
      onTabSelection={e => setTabIndex(e)}
    />
  )
})


test('Beagle Tab Bar should render the tabs corretly', () => {
  expect(wrapper).toMatchSnapshot()
})


test('Beagle Tab Bar should toggle the tab', () => {
  expect(wrapper.exists('[aria-label="First Tab"]')).toBeTruthy()
  expect(wrapper.exists('[aria-label="Second Tab"]')).toBeTruthy()
  expect(wrapper.exists('[aria-label="First Tab is the current Tab"]')).toBeFalsy()
  expect(wrapper.exists('[aria-label="Second Tab is the current Tab"]')).toBeFalsy()

  wrapper.find('[aria-label="Second Tab"]').at(1).simulate('click')
  wrapper.setProps({ currentTab: tabIndex })
  expect(wrapper.exists('[aria-label="First Tab is the current Tab"]')).toBeFalsy()
  expect(wrapper.exists('[aria-label="Second Tab is the current Tab"]')).toBeTruthy()

  wrapper.find('[aria-label="First Tab"]').at(1).simulate('click')
  wrapper.setProps({ currentTab: tabIndex })
  expect(wrapper.exists('[aria-label="First Tab is the current Tab"]')).toBeTruthy()
  expect(wrapper.exists('[aria-label="Second Tab is the current Tab"]')).toBeFalsy()

  wrapper.find('[aria-label="Second Tab"]').at(1).simulate('click')
  wrapper.setProps({ currentTab: tabIndex })
  expect(wrapper.exists('[aria-label="First Tab is the current Tab"]')).toBeFalsy()
  expect(wrapper.exists('[aria-label="Second Tab is the current Tab"]')).toBeTruthy()
})


