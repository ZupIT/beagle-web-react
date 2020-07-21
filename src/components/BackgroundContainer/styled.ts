import styled from 'styled-components'


interface StyledDiv{
    urlImg?:string,
}

export const StyledBackgroundContainer = styled.div<StyledDiv>`  
    background-image: url('${({urlImg}) =>  urlImg}'); 
    background-size: cover;
    width:100%;
    height:600px;
    background-repeat: no-repeat;
    display:flex;
    align-items: center;
    justify-content : center;
    text-align:center;
`
