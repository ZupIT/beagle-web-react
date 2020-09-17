import { BeagleDefaultComponent } from './types'

export type InputHandler = (event: { value: string }) => void

export type InputType = 'DATE' | 'EMAIL' | 'PASSWORD' | 'NUMBER' | 'TEXT'

export interface BaseTextInputInterface extends BeagleDefaultComponent {
  value: string,
  onChange?: InputHandler,
  onFocus?: InputHandler,
  onBlur?: InputHandler,
  disabled: boolean
}

export interface BeagleTextInputInterface extends BaseTextInputInterface {
    readOnly?: boolean,
    placeholder?: string,
    type?: InputType,
}

export interface BeagleTextAreaInterface extends BaseTextInputInterface {
  readonly?: boolean,
  name?: string,
  label?: string,
}

