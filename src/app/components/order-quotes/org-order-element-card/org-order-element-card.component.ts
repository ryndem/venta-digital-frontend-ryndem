import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'org-order-element-card',
  templateUrl: './org-order-element-card.component.html',
  styleUrls: ['./org-order-element-card.component.scss'],
})
export class OrgOrderElementCardComponent implements OnInit {

  @Input()
  quote!: any;

  items = 0;
  folio = '';
  total = 0;

  ngOnInit(): void {
    this.items = this.quote.items || this.quote.totalItems;
    this.folio = this.quote.folio || this.quote.internalOrderNumber;
    this.total = this.quote.total || this.quote.totalAmount;
  }
}
