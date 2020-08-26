import { BeagleDefaultComponent } from "./types";

export interface BeagleModalInterface extends BeagleDefaultComponent {
  isOpen: boolean,
  onClose: () => void,
}