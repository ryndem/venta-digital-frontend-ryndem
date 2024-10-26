import { Component, Input } from '@angular/core';
import { Quote } from 'app/model/quote';

@Component({
  selector: 'org-quotes-list',
  templateUrl: './org-quotes-list.component.html',
  styleUrl: './org-quotes-list.component.scss',
})
export class OrgQuotesListComponent {

  @Input()
  quotes!: Quote[];

}
