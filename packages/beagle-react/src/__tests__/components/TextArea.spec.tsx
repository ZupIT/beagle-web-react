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
import { configure, mount, shallow } from 'enzyme'
import TextArea from '../../components/TextArea'
import { BeagleTextAreaInterface } from 'common/models'

let wrapper: any
const beagleTextAreaMockProps: BeagleTextAreaInterface = {
  value: 'Testing',
  name: 'Testing',
  disabled: false,
  readOnly: false,
  className:'test-class',
  onChange: jest.fn(),
  onFocus: jest.fn(),
  onBlur: jest.fn(),
}

configure({ adapter: new Adapter() })
beforeAll(() => {
  wrapper = shallow(<TextArea {...beagleTextAreaMockProps} />)
})

test('Beagle snapshot text area', () => {
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

test('Should update the textarea value', () => {
  let textAreaTextState = ''
  const setAreeaTextState = (value: string) => textAreaTextState = value

   const textAreaWrapper = mount(
    <TextArea disabled={false} value={textAreaTextState} onChange={(e) => setAreeaTextState(e.value)} />
  )

  expect(textAreaWrapper.find('textarea').prop('value')).toBe('')
  textAreaWrapper.find('textarea').simulate('change', { target: { value: 'Changed' } })
  textAreaWrapper.setProps({ value: textAreaTextState })
  textAreaWrapper.update()
  expect(textAreaWrapper.find('textarea').prop('value')).toBe('Changed')
})

test('Should not update the disabled textarea value', () => {
  const onChange = jest.fn()

  const textAreaWrapper = mount(
    <TextArea disabled={true} value='' onChange={onChange} />
  )

  textAreaWrapper.find('textarea').simulate('change', { target: { value: 'Changed' } })
  expect(onChange).not.toHaveBeenCalled()
})
