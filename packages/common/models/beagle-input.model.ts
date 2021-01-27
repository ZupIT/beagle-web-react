import { BeagleDefaultComponent } from './types'

export type InputHandler = (event: { value: string }) => void

export type InputType = 'DATE' | 'EMAIL' | 'PASSWORD' | 'NUMBER' | 'TEXT'

export interface BeagleTextInputInterface extends BeagleDefaultComponent {
  value: string,
  onChange?: InputHandler,
  onFocus?: InputHandler,
  onBlur?: InputHandler,
  disabled: boolean,
  readOnly?: boolean,
  placeholder?: string,
  type?: InputType,
  error?: string,
  showError?: boolean,
}

export interface BeagleTextAreaInterface extends BeagleTextInputInterface {
  name?: string,
  label?: string,
}

