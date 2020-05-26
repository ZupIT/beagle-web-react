import styled from 'styled-components'

export const StyledModal = styled.div`
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    background-color: #FFF;
    border-radius: 25px;
    width: 800px;
    padding: 20px;
  }
`
