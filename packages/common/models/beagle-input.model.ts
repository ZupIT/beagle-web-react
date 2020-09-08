import { BeagleDefaultComponent } from './types'

export type InputHandler = (event: { value: string }) => void

export type InputType = 'DATE' | 'EMAIL' | 'PASSWORD' | 'NUMBER' | 'TEXT'

export interface BeagleTextInputInterface extends BeagleDefaultComponent {
  value: string,
  placeholder?: string,
  disabled?: boolean,
  readOnly?: boolean,
  type?: InputType,
  hidden?: boolean,
  onChange?: InputHandler,
  onFocus?: InputHandler,
  onBlur?: InputHandler,
}

export interface InputInterface extends BeagleTextInputInterface {
  isMultiline?: boolean,
}

export interface BeagleTextAreaInterface extends BeagleTextInputInterface {
  label?: string
}
