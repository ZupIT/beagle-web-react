import styled, { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Lato', sans-serif;
    font-size: 20px;
  }

  .default-font{
    font-size: 20px;
    line-height: 30px;
  }

  .small-font{
    font-size: 15px;
  }
  
  .medium-font{
    font-size: 25px;
    letter-spacing: 0px;
    line-height: 38px;
    text-align: center;
  }

  .large-font{
    font-size: 45px;
    font-weight: 700;
    letter-spacing: 0px;
    line-height: 58px;
  }

  .title-font{
    font-weight: 600;
    font-size: 45px;
  }
  .title-medium-font{
    font-weight: 600;
    font-size: 38px;
  }
  .title-small-font{
    font-weight: 550;
    font-size: 22px;
  }

  .button-style{
    cursor: pointer;
    font-size: 14.4px;
    font-weight: 700;
    letter-spacing: 2.4px;
    line-height: 24px;
    text-align: center;
    text-transform: uppercase;
    transition: all 0.2s ease 0s;
  }

  .button-style:hover {
    transform: scale(1.1);
  }


  
`


export const Body = styled.div`
  height: 100vh;
`


