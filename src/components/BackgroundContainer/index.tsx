import React, { ReactNode,FC } from 'react'
import { BackgroundContainer as StyledBackgroundContainer} from './styled'

export interface Props {
    children?: ReactNode,
    style?: Record<string, string>,
    urlImg?: string,
  }

const BackgroundContainer: FC<Props> = ({ style, children, urlImg }) => {
  
  return(
   <StyledBackgroundContainer urlImg={urlImg} style={style}>{children}

  </StyledBackgroundContainer>
  )

}


export default BackgroundContainer

