import { Component, Input } from '@angular/core';

/**
 * Component to show a structured info
 * @export
 * @class OrgInfoCardComponent
 */
@Component({
  selector: 'org-info-card',
  templateUrl: './org-info-card.component.html',
  styleUrls: ['./org-info-card.component.scss'],
})
export class OrgInfoCardComponent {
  
  /**
   * Info card title
   */
  @Input() title = '';

  /**
   * Info card description
   */
  @Input() description = '';
}
