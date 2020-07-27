import React, {FC} from 'react'
import Address from 'core/assets/png/address.png'
import Email from 'core/assets/png/email.png'
import Phone from 'core/assets/png/phone.png'
import Twitter from 'core/assets/png/twitter.png'
import Medium from 'core/assets/png/medium.png'
import Youtube from 'core/assets/png/youtube.png'
import Facebook from 'core/assets/png/facebook.png'

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
    const icon =  iconsMap[iconName]|| ''
    
    console.log(icon)
    //console.log(iconName);
    //console.log("icons name ---" + fac);

    return(
        <div><img src={icon}></img></div>
    )
  
  }
  
  
  export default Icon
  