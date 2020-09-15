import { BeagleDefaultComponent } from './types'

export type InputHandler = (event: { value: string }) => void

export type InputType = 'DATE' | 'EMAIL' | 'PASSWORD' | 'NUMBER' | 'TEXT'

export interface BaseTextInputInterface extends BeagleDefaultComponent {
  value: string,
  placeholder?: string,
  type?: InputType,
  hidden?: boolean,
  onChange?: InputHandler,
  onFocus?: InputHandler,
  onBlur?: InputHandler,
}

export interface BeagleTextInputInterface extends BaseTextInputInterface {
  disabled?: boolean | string,
  readOnly?: boolean | string,
}

export interface BeagleTextAreaInterface extends BaseTextInputInterface {
  disabled?: boolean,
  readonly?: boolean,
  name?: string,
  label?: string,
}

export interface BeagleReactNativeInputInterface extends BeagleTextInputInterface {
  isMultiline?: boolean,
}
