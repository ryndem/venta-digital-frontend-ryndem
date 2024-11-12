import { Component, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'app/model/user';

@Component({
  selector: 'closable',
  templateUrl: './closable.component.html',
})
export abstract class ClosableComponent {
  
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