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

import React, { FC, useMemo } from 'react'
import { BeagleDefaultComponent } from '../types'
import withTheme from '../utils/withTheme'

interface LinkItem {
  text: string,
  url?: string,
  onPress?: () => {},
}

export interface LinkListInterface extends BeagleDefaultComponent {
  items: LinkItem[],
}

function linkItemToJSX({ text, url = '#', onPress }: LinkItem, key: number) {
  return <li key={`${key}`}><a href={url} onClick={onPress}>{text}</a></li>
}

const LinkList: FC<LinkListInterface> = ({ items, style, className }) => {
  const listContent = useMemo(() => items.map(linkItemToJSX), items)
  return <ul style={style} className={className}>{listContent}</ul>
}

export default withTheme(LinkList)
