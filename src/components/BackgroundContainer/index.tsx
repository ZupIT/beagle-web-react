import React, { ReactNode,FC } from 'react'
import { StyledBackgroundContainer } from './styled'

export interface Props  {
    children?: ReactNode,
    style?: Record<string, string>,
    urlImg?: string,
  }

const BackgroundContainer: FC<Props> = props => {
  const {urlImg, style, children} = props
  
  return(
   <StyledBackgroundContainer urlImg={urlImg} style={style}>{children}

  </StyledBackgroundContainer>
  )

}


export default BackgroundContainer

