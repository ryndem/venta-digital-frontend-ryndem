import { Component, Input } from '@angular/core';

/**
 * Component to show order type description
 * @export
 * @class OrgQuotesDescriptionComponent
 */
@Component({
  selector: 'org-quotes-description',
  templateUrl: './org-quotes-description.component.html',
  styleUrls: ['./org-quotes-description.component.scss'],
})
export class OrgQuotesDescriptionComponent {

  /**
   * Order description type to show
   * @type {string}
   */
  @Input() descriptionType!: string;
  
  /**
   * Boolean to display/hide mobile description
   */
  showMobileDescription = false;

  /**
   * Method to toggle mobile description
   */
  toggleShowMobileDescription() {
    this.showMobileDescription = !this.showMobileDescription;
  }
}
