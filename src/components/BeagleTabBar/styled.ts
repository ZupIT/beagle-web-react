import styled, {css}  from 'styled-components'

interface Props {
  isActive: boolean
  index: number
}

export const StyledTabBar = styled.div`
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: space-between;
  width:100%;
  height:65px;
  background-color:#c5c5c5;
  border-radius:50px;
  color:#000000;
`

export const StyledBeagleTabItem = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  width:50%;
  height:100%;
  ${({isActive}) => isActive ? css`
    background-color: #df8006;
    color: #ffffff;
  `: ''};
  border-radius: ${({index}) => index == 0 ? '50px 0px 0px 50px' : '0px 50px 50px 0px'};
`

export const StyledBeagleTabItemContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  min-width: 20px;
  min-height: 15px;
  font-size: 25px;
  font-weight: 700;
  letter-spacing: 0px;
  line-height: 30px;
`

export const StyledTabImage = styled.div`
  width:500px;
  height:500px
`