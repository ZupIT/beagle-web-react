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

import React, { FC, useEffect, useRef, useMemo } from 'react'
import { Converter } from 'showdown'
import { BeagleDefaultComponent } from 'common/models'
import withTheme from '../utils/withTheme'
import { Container } from './styled'

export interface MarkdownInterface extends BeagleDefaultComponent {
  text: string,
}

const Markdown: FC<MarkdownInterface> = ({ text, style, className }) => {
  const htmlContainer = useRef() as React.MutableRefObject<HTMLDivElement>
  const converter = useMemo(() => new Converter(), [])

  function convertMarkdownToHTML() {
    if (!text) {
      htmlContainer.current.innerHTML = ''
      return
    }

    htmlContainer.current.innerHTML = converter
      .makeHtml(text)
      .replace(/<a ([^>]*)>/g, '<a target="_blank" $1>')
  }

  useEffect(convertMarkdownToHTML, [text])

  return <Container style={style} className={className} ref={htmlContainer} />
}

export default withTheme(Markdown)
