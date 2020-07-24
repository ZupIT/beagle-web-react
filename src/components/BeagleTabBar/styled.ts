import styled, {css}  from 'styled-components'

interface Props {
  isActive: boolean
  index: number
}

export const StyledTabBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width:100%;
  background-color:#c5c5c5;
  border-radius:50px;
  color: #ffffff;
`

export const StyledBeagleTabItem = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  width:50%;
  ${({isActive}) => isActive ? css`
    background-color: #df8006;
    color:#000000;
  `: ''};
  border-radius: ${({index}) => index == 0 ? '50px 0px 0px 50px' : '0px 50px 50px 0px'};
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

