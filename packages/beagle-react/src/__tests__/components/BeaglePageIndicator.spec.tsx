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
import BeaglePageIndicator from '../../components/BeaglePageIndicator'

let wrapper: any

configure({ adapter: new Adapter() })
beforeAll(() => {
  wrapper = shallow(<BeaglePageIndicator
    numberOfPages={2}
    currentPage={1}>
    <p>First Page</p><p>Second Page</p>
  </BeaglePageIndicator>)
})

test('Beagle snapshot Page Indicator', () => {
  expect(wrapper).toMatchSnapshot()
})

test('Beagle snapshot Page Indicator', () => {
  const props: any = wrapper.props()
  expect(props.children.length).toBe(2)
})
