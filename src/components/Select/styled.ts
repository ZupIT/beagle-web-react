import styled from 'styled-components'
import Select from 'react-select'

export const StyledSelect = styled.select`
  display: block;
  border-radius: 5px;
  border: 2px solid #F2F2F3;
  outline: none;
  padding: 4px 10px;
  transition: border 0.3s, box-shadow 0.3s;

  :hover {
    border: 2px solid #afe4ff;
  }

  :focus {
    border: 2px solid #afe4ff;
    box-shadow: 0 0 6px #bae4fb;
  }
`
