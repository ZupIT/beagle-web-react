import { BeagleDefaultComponent } from './types'

export type InputHandler = (event: { value: string }) => void

export type InputType = 'DATE' | 'EMAIL' | 'PASSWORD' | 'NUMBER' | 'TEXT'


export interface BeagleTextInputInterface extends BeagleDefaultComponent {
  value: string,
  onChange?: InputHandler,
  onFocus?: InputHandler,
  onBlur?: InputHandler,

  enabled?: boolean,
  readOnly?: boolean,
  placeholder?: string,
  type?: InputType,
  error?: string,
  showError?: boolean,
}

