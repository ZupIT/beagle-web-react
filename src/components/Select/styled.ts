import styled from 'styled-components'
import Select from 'react-Select'
import { StyledProperties } from '@core/constants/theme'

export const StyledSelect = styled.select<Select>`
  display: block;
  outline: none;
  padding: 4px 10px;

  
`

export const Group = styled.div
  `display: flex;
  flex-direction: column;`


export const Label = styled.label<StyledProperties>
  `display: block;
  color: #4A4A4A;
  margin-bottom: 10px;`


export const StyledForm = styled.form
  `position: relative;`
