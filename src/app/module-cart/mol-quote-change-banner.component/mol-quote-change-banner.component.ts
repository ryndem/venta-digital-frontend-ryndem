import { Component, Input } from '@angular/core';

@Component({
  selector: 'mol-quote-change-banner',
  templateUrl: './mol-quote-change-banner.component.html',
  styleUrls: ['./mol-quote-change-banner.component.scss']
})
export class MolQuoteChangeBannerComponent {

  @Input() showAlert = false;
}
