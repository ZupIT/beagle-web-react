import React, { ReactNode,FC } from 'react'
import { ContentPage as StyledContentPage } from './styled'

export interface Props {
    children?: ReactNode,
    style?: Record<string, string>,
  }

const ContentPage: FC<Props> = ({ style, children }) => (
  <StyledContentPage style={style}>{children}</StyledContentPage>

)

export default ContentPage
