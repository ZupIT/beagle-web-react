import React, { ReactNode,FC } from 'react'
import { ContentStart as StyledContentStart } from './styled'

export interface Props {
    children?: ReactNode,
    style?: Record<string, string>,
  }

const ContentStart: FC<Props> = ({ style, children }) => (
  <StyledContentStart style={style}>{children}</StyledContentStart>

)

export default ContentStart