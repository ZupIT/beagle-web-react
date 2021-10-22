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
import BeagleText from 'components/BeagleText'
import { Accessibility } from 'models/accessibility'
import { findDOMNode } from 'react-dom'

const ariaLabelText = 'Test Label'
const getAttrsAsArrayFromElement = (element: HTMLElement) =>  [...Array.from(element?.attributes || [])]
const getOnlyAriaBeagleA11YttrsFn = (a: Attr) => a.name.includes('aria-')
const getOnlyRoleBeagleA11YttrsFn = (a: Attr) => (a.name === 'role')
const getBeagleA11YttrsFn = (a: Attr) => getOnlyAriaBeagleA11YttrsFn(a) || getOnlyRoleBeagleA11YttrsFn(a)
const getAttributeValue = (attrs: NamedNodeMap, name: string) => attrs.getNamedItem(name)?.value || ''
const buildAccessibility = 
  (accessible: boolean, accessibilityLabel: string, isHeader: boolean): Accessibility => 
    ({ accessible, accessibilityLabel, isHeader })

configure({ adapter: new Adapter() })

test('Beagle snapshot Accessibility', () => {
  let wrapper = shallow(<BeagleText text='Test' className='test-class'  />)
  expect(wrapper).toMatchSnapshot()
})

// eslint-disable-next-line max-len
test('It should have no "aria-" attributes or "role" attribute when no accessibility is provided or "accessibility.accessible" is false', () => {
  let wrapper = mount(<BeagleText text='Test' className='test-class' />)
  let p = findDOMNode(wrapper.instance()) as HTMLParagraphElement
  
  let attrs = getAttrsAsArrayFromElement(p).filter(getBeagleA11YttrsFn)
  expect(attrs.length).toEqual(0)

  const a11y = buildAccessibility(false, ariaLabelText, true)
  wrapper = mount(<BeagleText text='Test' className='test-class' accessibility={a11y} />)
  p = findDOMNode(wrapper.instance()) as HTMLParagraphElement

  attrs = getAttrsAsArrayFromElement(p).filter(getBeagleA11YttrsFn)
  expect(attrs.length).toEqual(0)
})

it('should set the attribute [role="heading"] when "accessible" and "isHeader" are true', () => {
  const a11y = buildAccessibility(true, '', true)
  const wrapper = mount(<BeagleText text='Test' className='test-class' accessibility={a11y} />)
  const p = wrapper.getDOMNode() as HTMLParagraphElement

  const attrs = getAttrsAsArrayFromElement(p).filter(getOnlyAriaBeagleA11YttrsFn)

  expect(attrs.length).toEqual(0)
  expect(getAttributeValue(p.attributes, 'role')).toEqual('heading')
})

// eslint-disable-next-line max-len
it(`should set the attribute [aria-label="${ariaLabelText}"] when accessibilityLabel is setted`, () => {
  const a11y = buildAccessibility(true, ariaLabelText, false)
  const wrapper = mount(<BeagleText text='Test' className='test-class' accessibility={a11y} />)
  const p = wrapper.getDOMNode() as HTMLParagraphElement

  let attrs = getAttrsAsArrayFromElement(p).filter(getOnlyAriaBeagleA11YttrsFn)
  expect(attrs.length).toBeGreaterThan(0)

  attrs = getAttrsAsArrayFromElement(p).filter(getOnlyRoleBeagleA11YttrsFn)
  expect(attrs.length).toBe(0)

  expect(getAttributeValue(p.attributes, 'aria-label')).toEqual(ariaLabelText)
})

it(`should have role and [aria-label="${ariaLabelText}"] when everything is truthy`, () => {
  const a11y = buildAccessibility(true, ariaLabelText, true)
  const wrapper = mount(<BeagleText text='Test' className='test-class' accessibility={a11y} />)
  const p = wrapper.getDOMNode() as HTMLParagraphElement

  let attrs = getAttrsAsArrayFromElement(p).filter(getOnlyAriaBeagleA11YttrsFn)
  expect(attrs.length).toBeGreaterThan(0)

  attrs = getAttrsAsArrayFromElement(p).filter(getOnlyRoleBeagleA11YttrsFn)
  expect(attrs.length).toBeGreaterThan(0)

  expect(getAttributeValue(p.attributes, 'role')).toEqual('heading')
  expect(getAttributeValue(p.attributes, 'aria-label')).toEqual(ariaLabelText)
})
