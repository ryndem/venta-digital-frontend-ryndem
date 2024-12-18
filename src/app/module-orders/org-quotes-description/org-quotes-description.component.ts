import { Component, Input } from '@angular/core';

@Component({
  selector: 'org-quotes-description',
  templateUrl: './org-quotes-description.component.html',
  styleUrls: ['./org-quotes-description.component.scss'],
})
export class OrgQuotesDescriptionComponent {

  @Input()
  descriptionType!: string;
  showMobileDescription = false;

  toggleShowMobileDescription() {
    this.showMobileDescription = !this.showMobileDescription;
  }
}
