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

/* The only purpose of this component is to add an id to the tag of each component rendered
by Beagle. If the component renders multiple children, the id will be added to the first one only.
Unfortunately, we can't do it without a class component or without the use of ReactDOM.findNode,
which is not recommended by the React team. We should alter this as soon as React provides a better
way to do it. */

import { Component } from 'react'
import { findDOMNode } from 'react-dom'

class BeagleId extends Component<{ id: string }> {
  componentDidMount() {
    // eslint-disable-next-line
    const el: any = findDOMNode(this)
    if (el && el.setAttribute) el.setAttribute('data-beagle-id', this.props.id)
  }

  render() {
    return this.props.children
  }
}

export default BeagleId
