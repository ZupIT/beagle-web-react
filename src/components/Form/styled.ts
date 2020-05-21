import styled from 'styled-components'

export const StyledForm = styled.form`
  position: relative;
  width: 500px;
`

export const LoadingPanel = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(237, 237, 239, 0.6);
  opacity: ${({ isVisible }) => isVisible ? 1 : 0};
  pointer-events: ${({ isVisible }) => isVisible ? 'inherit' : 'none'};
  transition: opacity 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
`
