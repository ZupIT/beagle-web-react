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

import React, { FC, useEffect, useRef } from 'react'
import { BeagleModalInterface } from 'common/models'
import { buildAccessibility } from '../../../../common/utils/accessibility'
import withTheme from '../utils/withTheme'
import { StyledModal } from './styled'

/**
 * @deprecate since version 1.8.0.
 * This component will be removed in a future version.
*/
const Modal: FC<BeagleModalInterface> = props => {
  const { isOpen, onClose, style, className, children, accessibility } = props
  const elementRef = useRef<HTMLDivElement>(null)
  const a11y = buildAccessibility(accessibility)

  function closeOnEsc({ key }: KeyboardEvent) {
    if (key === 'Escape') {
      onClose()
      document.removeEventListener('keyup', onClose)
    }
  }

  function closeOnClickOutside({ target }: React.MouseEvent<HTMLDivElement>) {
    if (!elementRef.current || !elementRef.current.firstChild) return
    if (!elementRef.current.firstChild.contains(target as Node)) onClose()
  }

  useEffect(() => {
    document.addEventListener('keyup', closeOnEsc)
    return () => document.removeEventListener('keyup', closeOnEsc)
  }, [])

  const modal = (
    <StyledModal 
      ref={elementRef}
      style={style}
      className={className}
      onClick={closeOnClickOutside}
      aria-modal={true}
      {...a11y}>
      {children}
    </StyledModal>
  )

  return isOpen ? modal : null
}

export default withTheme(Modal)
