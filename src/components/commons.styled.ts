import styled, { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Lato', sans-serif;
  }
  .button{
    font-size: 20px;
  }
`

export const Body = styled.div`
  height: 100vh;
`



/*export const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
*/

