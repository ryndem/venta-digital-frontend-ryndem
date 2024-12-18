import { Component, HostListener } from '@angular/core';
@Component({
  selector: 'closable',
  template: ''
})
export abstract class AtmClosableComponent {
  
  private isInsideClick = false;

  abstract close():void;
  
  @HostListener('click')
  clickInside() {
    this.isInsideClick = true;
  }
  
  @HostListener('document:click')
  clickOut() {
    if(!this.isInsideClick) {
      this.close();
    }
    this.isInsideClick = false;
  }
  
}