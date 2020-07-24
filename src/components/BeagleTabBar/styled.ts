import styled from 'styled-components'

export const StyledTabBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width:100%;
  background-color:#c5c5c5;
  border-radius:50px;
  color: #ffffff;
`

export const StyledBeagleTabItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width:50%;
`

export const StyledBeagleTabItemContent = styled.div`
  width:100%
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-width: 20px;
  min-height: 15px;
`


export const StyledBeagleTabItemSelected = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width:50%;
  background-color: #df8006;
`


export const StyledSelected = styled.div`
  background-color: #df8006;
`


export const StyledUnselect = styled.div`
  background-color: #c5c5c5;
`
