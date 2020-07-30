import React, { FC, } from 'react'
import map from 'lodash/map'


import { StyledSelect } from './styled'

interface Option {
  name: string,
  value: string,
}

export interface Props {

  name: string,
  options: Option[],
  value?: string,
  style?: Record<string, string>,
  onChange: (value: any) => void,
}

const Select: FC<Props> = ({  name, options, style, value: initialValue, onChange }) => {
  const opts = useMemo(() => map(options, ({ name, value }) => ({ label: name, value })), [options])

  const handleChange = (value: any) => {
    onChange && onChange({ value })
  }

  return (
    <Group style={style}>
      <Label>{label}:</Label>
      <StyledSelect
        name={name}
        onChange={event => handleChange(event.target.value)}
        value={initialValue}
      >
        {opts.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
      </StyledSelect>
    </Group>
  )
}

export default Select