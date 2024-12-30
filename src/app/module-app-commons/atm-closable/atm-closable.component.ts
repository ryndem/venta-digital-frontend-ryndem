import { Component, HostListener } from '@angular/core';
/**
 * Abstract class to capture click events outside of a component
 * @export
 * @abstract
 * @class AtmClosableComponent
 */
@Component({
  selector: 'closable',
  template: ''
})
export abstract class AtmClosableComponent {
  
  /**
   * Flag to indicate if the click was inside the component
   * @private
   */
  private isInsideClick = false;

  /**
   * Abstract method to close the super component
   * @abstract
   */
  abstract close():void;
  
  /**
   * Method for the inside click
   */
  @HostListener('click')
  clickInside() {
    this.isInsideClick = true;
  }
  
  /**
   * Method for the outside click
   */
  @HostListener('document:click')
  clickOut() {
    if(!this.isInsideClick) {
      this.close();
    }
    this.isInsideClick = false;
  }
  
}