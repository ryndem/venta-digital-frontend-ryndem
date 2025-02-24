import { Component, Input } from '@angular/core';

/**
 * Component to show circle loader
 * @export
 * @class AtmLoaderCircleComponent
 */
@Component({
  selector: 'atm-loader-circle',
  templateUrl: './atm-loader-circle.component.html',
  styleUrls: ['./atm-loader-circle.component.scss'],
})
export class AtmLoaderCircleComponent {

  /**
   * Message to show with the loader
   * @type {(string | null)}
   */
  @Input() message: string | null = null;
}
