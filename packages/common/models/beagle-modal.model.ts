import { BeagleDefaultComponent } from './types'

/**
 * @deprecate since version 1.8.0.
 * This interface will be removed in a future version.
*/
export interface BeagleModalInterface extends BeagleDefaultComponent {
  isOpen: boolean,
  onClose: () => void,
}
