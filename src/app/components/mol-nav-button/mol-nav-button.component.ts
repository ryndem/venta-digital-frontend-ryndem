import { Component, Input } from '@angular/core';

/**
 * Button for the header navigation
 * @export
 * @class MolNavButtonComponent
 */
@Component({
  selector: 'mol-nav-button',
  templateUrl: './mol-nav-button.component.html',
  styleUrls: ['./mol-nav-button.component.scss'],
})
export class MolNavButtonComponent {

  /**
   * Boolean to indicate if the component is disabled
   */
  @Input() disabled = false;

  /**
   * Classes to set to the tag
   */
  @Input() class = '';
}
