import { Component, Input, OnInit } from '@angular/core';
import { QuoteProduct } from 'app/model/quote-product';
import { ImageService } from 'app/services/image.service';

@Component({
  selector: 'org-quote-card-detail',
  templateUrl: './org-quote-card-detail.component.html',
  styleUrl: './org-quote-card-detail.component.scss'
})
export class OrgQuoteCardDetailComponent implements OnInit {

  @Input()
  quoteProduct!: QuoteProduct;

  brandImage: string | null = null;
  presentationImage: string | null = null;

  constructor (private imageService: ImageService) {}

  ngOnInit(): void {
    this.brandImage = this.imageService.getBrandImage(this.quoteProduct);
    this.presentationImage = this.imageService.getPresentationImage(this.quoteProduct);
  }

}
