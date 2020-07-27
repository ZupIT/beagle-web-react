import React, {FC} from 'react'

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
    const icon = iconsMap[iconName]|| ''
    
    
    //console.log(iconName);
    //console.log("icons name ---" + fac);

    return(
        <div><img src={icon}></img></div>
    )
  
  }
  
  
  export default Icon
  