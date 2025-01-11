import { Component, Input, OnInit } from '@angular/core';
import { OrderItem } from 'app/model/order-item';
import { ImageUtils } from 'app/utils/image.utils';

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
   * @type {(string | null)}
   */
  brandImage: string | null = null;

  /**
   * Boolean to track if the card is open
   */
  isOpen = false;

  /**
   * Creates an instance of OrgOrderItemCardComponent.
   * @param {ImageUtils} imageUtils
   */
  constructor(private imageUtils: ImageUtils) {}

  /**
   * Initializing method
   */
  ngOnInit(): void {
    this.brandImage = this.imageUtils.getBrandImage(this.orderItem);
    this.presentationImage = this.imageUtils.getPresentationImage(this.orderItem);
  }

  /**
   * Method to manage card open
   */
  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

}
