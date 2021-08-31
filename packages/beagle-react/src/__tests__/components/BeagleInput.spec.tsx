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
import { configure, mount, shallow } from 'enzyme'
import BeagleInput from '../../components/BeagleInput'
import { BeagleTextInputInterface } from 'common/models'

let wrapper: any
const beagleInputPropsMock: BeagleTextInputInterface = {
  value: 'Testing',
  placeholder: 'Testing',
  enabled: true,
  readOnly: false,
  type: 'TEXT',
  onChange: jest.fn(),
  onFocus: jest.fn(),
  onBlur: jest.fn(),
}

configure({ adapter: new Adapter() })
beforeAll(() => {
  wrapper = shallow(<BeagleInput {...beagleInputPropsMock} />)
})

test('Beagle snapshot Input', () => {
  expect(wrapper).toMatchSnapshot()
})

test('Should call on change handler', () => {
  const props: any = wrapper.props()
  wrapper.simulate('change', { value: 'changed' })
  expect(props.onChange).toHaveBeenCalledTimes(1)
})

test('Should call on focus handler', () => {
  const props: any = wrapper.props()
  wrapper.simulate('focus')
  expect(props.onFocus).toHaveBeenCalledTimes(1)
})

test('Should call on blur handler', () => {
  const props: any = wrapper.props()
  wrapper.simulate('blur')
  expect(props.onBlur).toHaveBeenCalledTimes(1)
})

test('Should update text on input', () => {
  let inputStateValue = ''
  function setTeste(value: string) {
    inputStateValue = value
  }

  const wrapper = mount(
    <BeagleInput
      value={inputStateValue}
      readOnly={false}
      placeholder="Testing"
      type="TEXT"
      onChange={(nova) => {
        setTeste(nova.value)
      }}
    />
  )

  expect(wrapper.find('input').prop('value')).toBe('')
  wrapper.simulate('change', { target: { value: 'Changed' } })
  wrapper.setProps({ value: inputStateValue })
  expect(wrapper.find('input').prop('value')).toBe('Changed')
})
