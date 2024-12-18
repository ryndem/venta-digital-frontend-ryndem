import { Component, Input, OnInit } from '@angular/core';
import { OrderItem } from 'app/model/order-item';
import { ImageService } from 'app/services/image.service';

@Component({
  selector: 'org-order-item-card',
  templateUrl: './org-order-item-card.component.html',
  styleUrls: ['./org-order-item-card.component.scss']
})
export class OrgOrderItemCardComponent implements OnInit{
  
  @Input()
  orderItem!: OrderItem;

  presentationImage: string | null = null;
  brandImage: string | null = null;

  statusLabel = '';
  statusClass = '';
  isOpen = false;

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.brandImage = this.imageService.getBrandImage(this.orderItem);
    this.presentationImage = this.imageService.getPresentationImage(this.orderItem);
    if(this.orderItem?.itemTracking?.length > 0) {
      this.statusLabel = this.orderItem.itemTracking[0].statusTracking;
      this.statusClass = this.getStatusClass(this.statusLabel)
    }
  }


  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  private getStatusClass(statusLabel: string) {
    return statusLabel.toLowerCase().replace(' ', '-');
  }

}
