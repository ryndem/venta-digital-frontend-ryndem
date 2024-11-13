import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'org-split-screen',
  templateUrl: './org-split-screen.component.html',
  styleUrls: ['./org-split-screen.component.scss'],
})
export class SplitScreenComponent {
  showHeroImage = true;

  constructor(private router: Router) {
    this.showHeroImage = !this.router.url.includes('/auth/reset-password');
  }
}
