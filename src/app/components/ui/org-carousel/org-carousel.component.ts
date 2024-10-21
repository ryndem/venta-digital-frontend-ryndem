import { Component } from '@angular/core';
import { CarouselItem } from '../mol-carousel-item/carousel-image';

@Component({
  selector: 'org-carousel',
  templateUrl: './org-carousel.component.html',
  styleUrl: './org-carousel.component.scss',
})
export class OrgCarouselComponent {
  banners: CarouselItem[] = [
    {
      mobile: 'assets/imgs/banners/01_mobile.jpg',
      tablet: 'assets/imgs/banners/01_tablet.jpg',
      web: 'assets/imgs/banners/01_web.jpg',
      link: 'https://proquifa.dev-lk.mx/products?category=standards',
    },
    {
      mobile: 'assets/imgs/banners/02_mobile.jpg',
      tablet: 'assets/imgs/banners/02_tablet.jpg',
      web: 'assets/imgs/banners/02_web.jpg',
      link: 'https://proquifa.dev-lk.mx/products/a1bc16a8-6829-4138-b963-bb2cf56641a2',
    },
    {
      mobile: 'assets/imgs/banners/03_mobile.jpg',
      tablet: 'assets/imgs/banners/03_tablet.jpg',
      web: 'assets/imgs/banners/03_web.jpg',
      link: 'https://proquifa.dev-lk.mx/products/c9c8601e-18bf-4f26-b476-3894dbb41868',
    },
    {
      mobile: 'assets/imgs/banners/04_mobile.jpg',
      tablet: 'assets/imgs/banners/04_tablet.jpg',
      web: 'assets/imgs/banners/04_web.jpg',
      link: 'https://proquifa.dev-lk.mx/products?category=&page=1',
    },
  ];

  currentImage: number = 0;

  setImageByIndex(index: number): void {
    if (index > this.banners.length || index < 0) {
      return;
    }

    this.currentImage = index;
  }
}
