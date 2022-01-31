/*
 * Copyright 2020, 2022 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
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
import BeagleError from 'components/BeagleError'
import {
  ErrorsDetailedContainer,
  StyledRetryButton,
  StyledShowMoreButton,
} from 'components/BeagleError/styled'

let wrapper: any
let retryClickMock: any
const errors = [{ message: 'First Message' }, { message: 'Second Message' }]

configure({ adapter: new Adapter() })

describe('Beagle Error - render correctly without details', () => {
  const getComponent = (retryClickMock: () => void) => (
    <BeagleError className="Test Class" retry={retryClickMock} errors={[]} />
  )

  // this way is only required when we have styled-components and we also need to test the children of the tested component as well
  describe('Snapshot', () => {
    beforeAll(() => {
      retryClickMock = jest.fn()
      wrapper = shallow(getComponent(retryClickMock))
    })

    it('Should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Tests', () => {
    beforeAll(() => {
      retryClickMock = jest.fn()
      wrapper = mount(getComponent(retryClickMock))
    })

    it('Should not render details when no error is provided', () => {
      const showMore = wrapper.find(StyledShowMoreButton)
      const details = wrapper.find(ErrorsDetailedContainer)

      expect(showMore.length).toBe(0)
      expect(details.length).toBe(0)
    })

    it('Should call retry function on click', () => {
      wrapper.find(StyledRetryButton).at(0).simulate('click')
      expect(retryClickMock).toHaveBeenCalledTimes(1)
    })
  })
})

describe('Beagle Error - render correctly with details', () => {
  const getComponent = (retryClickMock: () => void) => (
    <BeagleError
      className="Test Class"
      retry={retryClickMock}
      errors={errors} />
  )
  
  // this way is only required when we have styled-components and we also need to test the children of the tested component as well
  describe('Snapshot', () => {
    beforeAll(() => {
      retryClickMock = jest.fn()
      wrapper = shallow(getComponent(retryClickMock))
    })
  
    it('Should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Tests', () => {
    beforeAll(() => {
      retryClickMock = jest.fn()
      wrapper = mount(getComponent(retryClickMock))
    })
  
    it('Should call retry function on click', () => {
      wrapper.find(StyledRetryButton).at(0).simulate('click')
      expect(retryClickMock).toHaveBeenCalledTimes(1)
    })
  
    it('Should render details when error list is provided', () => {
      const showMore = wrapper.find(StyledShowMoreButton)
      const details = wrapper.find(ErrorsDetailedContainer)
      const messages = details.at(0).find('p')
  
      expect(showMore.length).toBe(1)
      expect(details.length).toBe(1)
      expect(messages.length).toBe(2)
    })
  
    it('Should not add the class when the show more button was not clicked', () => {
      expect(wrapper.find('section.show').length).toBe(0)
    })
  
    it('Should add the class when the show more button was clicked', () => {
      wrapper.find(StyledShowMoreButton).at(0).simulate('click')
      expect(wrapper.find('section.show').length).toBe(1)
  
      wrapper.find(StyledShowMoreButton).at(0).simulate('click')
      expect(wrapper.find('section.show').length).toBe(0)
    })
  })  
})
