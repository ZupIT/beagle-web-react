import { BeagleDefaultComponent } from './types'

export type InputHandler = (event: { value: string }) => void

export type InputType = 'DATE' | 'EMAIL' | 'PASSWORD' | 'NUMBER' | 'TEXT'

export interface BeagleTextInputInterface extends BeagleDefaultComponent {
  value: string,
  onChange?: InputHandler,
  onFocus?: InputHandler,
  onBlur?: InputHandler,
  /**
  * @Deprecated It was deprecated in version 1.7.0 and will be removed in a future version.
  *  Use field enabled to control is enabled or not in this layout.
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

