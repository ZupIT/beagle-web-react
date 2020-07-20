import React from 'react'
import { Switch, Route } from 'react-router-dom'
import DynamicRoute from 'components/DynamicRoute'

const Home = DynamicRoute(() => import('containers/Home'/* webpackChunkName: 'sign-up' */))
const Test = DynamicRoute(() => import('containers/Test'))

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/test" component={Test} />
  </Switch>
)

export default Routes
