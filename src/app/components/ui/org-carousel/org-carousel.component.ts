import { Component } from '@angular/core';
import { CarouselItem } from '../mol-carousel-item/carousel-image';

@Component({
  selector: 'org-carousel',
  templateUrl: './org-carousel.component.html',
  styleUrl: './org-carousel.component.scss'
})
export class OrgCarouselComponent {

  banners:CarouselItem[] = [
    { 
      'mobile': 'assets/imgs/banners/01_mobile.jpg',
      'tablet': 'assets/imgs/banners/01_tablet.jpg',
      'web':    'assets/imgs/banners/01_web.jpg',
      'link':   null  
    },
    { 
      'mobile': 'assets/imgs/banners/02_mobile.jpg',
      'tablet': 'assets/imgs/banners/02_tablet.jpg',
      'web':    'assets/imgs/banners/02_web.jpg',
      'link':   null  
    },
    { 
      'mobile': 'assets/imgs/banners/03_mobile.jpg',
      'tablet': 'assets/imgs/banners/03_tablet.jpg',
      'web':    'assets/imgs/banners/03_web.jpg',
      'link':   null  
    },
    { 
      'mobile': 'assets/imgs/banners/04_mobile.jpg',
      'tablet': 'assets/imgs/banners/04_tablet.jpg',
      'web':    'assets/imgs/banners/04_web.jpg',
      'link':   null
    }
  ]

  currentImage: number = 0;

  setImageByIndex(index: number): void {
    if (index > this.banners.length || index < 0) {
      return;
    }

    this.currentImage = index;
  }

}
