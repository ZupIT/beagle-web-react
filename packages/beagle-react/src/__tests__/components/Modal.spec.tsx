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
import { configure, mount } from 'enzyme'
import Modal from '../../components/Modal'

configure({ adapter: new Adapter() })

test('Beagle snapshot Modal', () => {
  const onClickMock = jest.fn()
  let wrapper =  mount(<Modal onClose={onClickMock} isOpen={true} />)

  expect(wrapper).toMatchSnapshot()
})

test('Should render a open modal with the children inside, then close, then open again', () => {
  let opened = true
  const onClickOpenedMock = () => (opened = !opened)
  let wrapperOpened = mount(
    <Modal onClose={onClickOpenedMock} isOpen={opened}>
      Opened modal
    </Modal>
  )

  expect(wrapperOpened.text()).toContain('Opened modal')
  wrapperOpened.setProps({ isOpen: false })
  expect(wrapperOpened.text()).not.toContain('Opened modal')
  wrapperOpened.setProps({ isOpen: true })
  expect(wrapperOpened.text()).toContain('Opened modal')
})

test('Should render a closed modal, then open with the children inside', () => {
  let closed = false
  const onClickClosedMock = () => (closed = !closed)
  let wrapperClosed = mount(
    <Modal onClose={onClickClosedMock} isOpen={closed}>
      Closed modal
    </Modal>
  )

  expect(wrapperClosed.text()).not.toContain('Closed modal')
  wrapperClosed.setProps({ isOpen: true })
  expect(wrapperClosed.text()).toContain('Closed modal')
  wrapperClosed.setProps({ isOpen: false })
  expect(wrapperClosed.text()).not.toContain('Closed modal')
})
