import { Component, Input } from '@angular/core';
import { Quote } from 'app/model/quote';

@Component({
  selector: 'org-quote-card',
  templateUrl: './org-quote-card.component.html',
  styleUrl: './org-quote-card.component.scss',
})
export class OrgQuoteCardComponent {

  @Input()
  quote!: Quote;

}
