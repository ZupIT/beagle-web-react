import styled from 'styled-components'


interface props{
    urlImg?:string,
}

export const BackgroundContainer = styled.div<props>`  
    background-image: url(${urlImg}); 
    background-size: cover;
    width:100%;
    height:600px;
    background-repeat: no-repeat;
    display:flex;
    align-items: center;
    justify-content : center;
    text-align:center;
`
