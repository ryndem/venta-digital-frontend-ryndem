import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Layout component to create split screen pages
 * @export
 * @class OrgSplitScreenComponent
 */
@Component({
  selector: 'org-split-screen',
  templateUrl: './org-split-screen.component.html',
  styleUrls: ['./org-split-screen.component.scss'],
})
export class OrgSplitScreenComponent {

  
  /**
   * Boolean to show hero image
   */
  showHeroImage = true;

  /**
   * Creates an instance of OrgSplitScreenComponent.
   * @param {Router} router
   */
  constructor(private router: Router) {
    this.showHeroImage = !this.router.url.includes('/auth/reset-password');
  }
}
