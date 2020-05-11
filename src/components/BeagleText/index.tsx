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

import React, { FC } from 'react'
import { StyledText } from './styled'
import { filterBooleanArray } from '../../utils/array'
import { TextAlignment } from '../../types'

export interface BeagleTextInterface {
	text: string;
	theme?: string;
	textColor?: string;
	alignment?: TextAlignment;
	className?: string;
}

const BeagleText: FC<BeagleTextInterface> = props => {
	const { text, className, theme, textColor, alignment } = props
	const validClass = filterBooleanArray([className, theme])
	const classNames = validClass.join()
	return (
		<StyledText textColor={textColor} alignment={alignment} className={classNames}>
			{text}
		</StyledText>
	)
}

export default BeagleText