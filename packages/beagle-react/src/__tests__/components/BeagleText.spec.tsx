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
import { configure, mount, ReactWrapper } from 'enzyme'
import BeagleText from '../../components/BeagleText'
import { StyledText } from '../../components/BeagleText/styled'

const initialText = 'Test'

configure({ adapter: new Adapter() })

test('Beagle snapshot Text', () => {
  const wrapper: ReactWrapper<typeof BeagleText> = mount(<BeagleText text={initialText} className='text-class'/>)
  expect(wrapper).toMatchSnapshot()
})

test('it should render the string as initialized', () => {
  const wrapper: ReactWrapper<typeof BeagleText> = mount(<BeagleText text={initialText} />)
  const p = wrapper.find(StyledText).getDOMNode<HTMLParagraphElement>()
  expect(p?.innerHTML).toBe(initialText)
})

test('it should render not render any text when text is null', () => {
  const wrapper: ReactWrapper<typeof BeagleText> = mount(<BeagleText text={null} />)
  const p = wrapper.find(StyledText).getDOMNode<HTMLParagraphElement>()
  expect(p?.innerHTML.length).toBe(0)
})

test('it should render not render any text when text is undefined', () => {
  const wrapper: ReactWrapper<typeof BeagleText> = mount(<BeagleText text={undefined} />)
  const p = wrapper.find(StyledText).getDOMNode<HTMLParagraphElement>()
  expect(p?.innerHTML.length).toBe(0)
})

test('it should render numbers as strings', () => {
  const value = 123.45
  const wrapper: ReactWrapper<typeof BeagleText> = mount(<BeagleText text={value} />)
  const p = wrapper.find(StyledText).getDOMNode<HTMLParagraphElement>()
  expect(p?.innerHTML).toBe(String(value))
})

test('it should render an object as stringfied json object', () => {
  const obj = { my: 'test' }
  const wrapper: ReactWrapper<typeof BeagleText> = mount(<BeagleText text={obj} />)
  const p = wrapper.find(StyledText).getDOMNode<HTMLParagraphElement>()
  expect(p?.innerHTML).toBe(JSON.stringify(obj))
})

test('it should render an array as stringfied json array', () => {
  const arr = [{ my: 'test' }, 'test', 123.45]
  const wrapper: ReactWrapper<typeof BeagleText> = mount(<BeagleText text={arr} />)
  const p = wrapper.find(StyledText).getDOMNode<HTMLParagraphElement>()
  expect(p?.innerHTML).toBe(JSON.stringify(arr))
})

test('it should render an function as empty string', () => {
  const fun = function test() { return true }
  const wrapper: ReactWrapper<typeof BeagleText> = mount(<BeagleText text={fun} />)
  const p = wrapper.find(StyledText).getDOMNode<HTMLParagraphElement>()
  expect(p?.innerHTML).toBe('')
})
