import React, {FC,Fragment} from 'react'
import {IconContainer} from './styled'

import Address from 'core/assets/svg/address.svg'
import Email from 'core/assets/svg/email.svg'
import Phone from 'core/assets/svg/phone.svg'
import Twitter from 'core/assets/svg/twitter.svg'
import Medium from 'core/assets/svg/medium.svg'
import Youtube from 'core/assets/svg/youtube.svg'
import Facebook from 'core/assets/svg/facebook.svg'

interface Props {
    iconName: string
}

const iconsMap:Record<string,string> = {
    Address,
    Email,
    Phone,
    Twitter,
    Medium,
    Youtube,
    Facebook
}

const Icon: FC<Props> = props => {
    const {iconName} = props
    const Icon = iconsMap[iconName] || Fragment

    return(
        <IconContainer><Icon/></IconContainer>
    )
  }
  
export default Icon
  