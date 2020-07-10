import React from 'react'
import { shallow } from 'enzyme'
import ErrorBoundary from '../'

describe('ErrorBoundary', () => {
  it('should render', () => {
    const component = shallow(<ErrorBoundary><div /></ErrorBoundary>)
    expect(component).toMatchSnapshot()
  })
})
