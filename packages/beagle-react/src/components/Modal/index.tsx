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
import withTheme from '../utils/withTheme'
import { StyledModal } from './styled'


const Modal: FC<BeagleModalInterface> = ({ isOpen, onClose, style, className, children }) => {
  const elementRef = useRef<HTMLDivElement>(null)

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
      aria-modal>
      {children}
    </StyledModal>
  )

  return isOpen ? modal : null
}

export default withTheme(Modal)
