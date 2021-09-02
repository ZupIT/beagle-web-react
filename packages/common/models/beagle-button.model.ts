import { BeagleComponent } from '../types'
import { BeagleDefaultComponent } from './types'


export interface BeagleButtonInterface extends BeagleDefaultComponent, BeagleComponent {
  text: string,
  onPress?: () => void,
  enabled?: boolean, 
}
