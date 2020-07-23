import styled from 'styled-components'

export const StyledTabBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width:400px;
  background-color:#c5c5c5;
  border-radius:50px;
  color: #ffffff;
`

export const StyledBeagleTabItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
  width: 100%;
`

export const StyledBeagleTabItemContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-width: 20px;
  min-height: 15px;

  &:hover {
    background-color: #df8006;
  }
`

export const StyledSelected = styled.div`
  background-color: #df8006;
`


export const StyledUnselect = styled.div`
  background-color: #c5c5c5;
`
