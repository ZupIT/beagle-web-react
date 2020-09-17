import { BeagleDefaultComponent } from './types'

export type InputHandler = (event: { value: string }) => void

export type InputType = 'DATE' | 'EMAIL' | 'PASSWORD' | 'NUMBER' | 'TEXT'

export interface BeagleTextInputInterface extends BeagleDefaultComponent {
  value: string,
  placeholder?: string,
  type?: InputType,
  onChange?: InputHandler,
  onFocus?: InputHandler,
  onBlur?: InputHandler,
  disabled?: boolean,
  readOnly?: boolean,
}

export interface BeagleTextAreaInterface extends BeagleTextInputInterface {
  disabled?: boolean,
  readonly?: boolean,
  name?: string,
  label?: string,
}

