import React from 'react'
import { Switch, Route } from 'react-router-dom'
import DynamicRoute from 'components/DynamicRoute'

const Home = DynamicRoute(() => import('containers/Home'/* webpackChunkName: 'sign-up' */))

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
  </Switch>
)

export default Routes
