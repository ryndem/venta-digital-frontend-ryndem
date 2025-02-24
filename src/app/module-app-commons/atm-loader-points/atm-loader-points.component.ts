import { Component, Input } from '@angular/core';

/**
 * Component to show points loader
 * @export
 * @class AtmLoaderPointsComponent
 */
@Component({
  selector: 'atm-loader-points',
  templateUrl: './atm-loader-points.component.html',
  styleUrls: ['./atm-loader-points.component.scss'],
})
export class AtmLoaderPointsComponent {
  
  /**
   * Message to show with the loader
   * @type {(string | null)}
   */
  @Input() message: string | null = null;
}
