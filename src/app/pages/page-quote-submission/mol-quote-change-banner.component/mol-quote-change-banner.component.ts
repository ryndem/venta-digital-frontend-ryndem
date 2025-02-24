import { Component, Input } from '@angular/core';

/**
 * Component to show quote change banner
 * @export
 * @class MolQuoteChangeBannerComponent
 */
@Component({
  selector: 'mol-quote-change-banner',
  templateUrl: './mol-quote-change-banner.component.html',
  styleUrls: ['./mol-quote-change-banner.component.scss']
})
export class MolQuoteChangeBannerComponent {

  /**
   * Bolean to indicate if the alert is visible
   */
  @Input() showAlert = false;
}
