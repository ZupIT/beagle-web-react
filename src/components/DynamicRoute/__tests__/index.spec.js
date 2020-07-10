import React from 'react'
import { shallow } from 'enzyme'
import DynamicRoute from '../'

describe('DynamicRoute', () => {

  const Home = DynamicRoute(() => import('containers/Home'/* webpackChunkName: 'home-screen' */))

  it('should render', () => {
    const component = shallow(<Home />)
    expect(component).toMatchSnapshot()
  })
})
