import { Component, Input, OnInit } from '@angular/core';
import { OrderItem } from 'app/model/order-item';
import { ImageService } from 'app/services/image.service';

/**
 * Order item card
 * @export
 * @class OrgOrderItemCardComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'org-order-item-card',
  templateUrl: './org-order-item-card.component.html',
  styleUrls: ['./org-order-item-card.component.scss']
})
export class OrgOrderItemCardComponent implements OnInit{
  
  /**
   * Order item to show
   * @type {OrderItem}
   */
  @Input() orderItem!: OrderItem;

  /**
   * Product presentation image path
   * @type {(string | null)}
   */
  presentationImage: string | null = null;

  /**
   * Product brand image path
   *
   * @type {(string | null)}
   * @memberof OrgOrderItemCardComponent
   */
  brandImage: string | null = null;

  /**
   * Boolean to track if the card is open
   */
  isOpen = false;

  /**
   * Creates an instance of OrgOrderItemCardComponent.
   * @param {ImageService} imageService
   */
  constructor(private imageService: ImageService) {}

  /**
   * Initializing method
   */
  ngOnInit(): void {
    this.brandImage = this.imageService.getBrandImage(this.orderItem);
    this.presentationImage = this.imageService.getPresentationImage(this.orderItem);
  }

  /**
   * Method to manage card open
   */
  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

}
