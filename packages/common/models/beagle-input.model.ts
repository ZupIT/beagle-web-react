import { BeagleDefaultComponent } from './types'

export type InputHandler = (event: { value: string }) => void

export type InputType = 'DATE' | 'EMAIL' | 'PASSWORD' | 'NUMBER' | 'TEXT'

export interface BeagleTextInputInterface extends BeagleDefaultComponent {
  value: string,
  onChange?: InputHandler,
  onFocus?: InputHandler,
  onBlur?: InputHandler,
  /**
  * @deprecated since version 1.7.0. Use `enabled` instead.
  *  Use field `enabled` to control whether the button is enabled or not in the layout.
  */
  disabled?: boolean,
  enabled?: boolean,
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

