import styled from 'styled-components'
import { BeagleTheme } from '../commons.styled'

export const StyledModal = styled.div`
  background: ${BeagleTheme.darkGray};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    background-color: #FFF;
    border-radius: 25px;
    padding: 30px;
  }
`
