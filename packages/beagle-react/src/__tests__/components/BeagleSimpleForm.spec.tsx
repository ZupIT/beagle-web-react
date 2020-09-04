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
import { configure, shallow, mount } from 'enzyme'
import Form from '../../components/BeagleSimpleForm'

let wrapper: any
let onSubmitMock: any

configure({ adapter: new Adapter() })
beforeAll(() => {
  onSubmitMock = jest.fn(()=>'submited')
  wrapper = mount(<Form onSubmit={onSubmitMock}/>)
})

test('Beagle snapshot SimpleForm', () => {
  expect(wrapper).toMatchSnapshot()
})

test('Should call on submit handler', () => {
  wrapper.simulate('submit')
  expect(onSubmitMock).toHaveBeenCalledTimes(1)
})

