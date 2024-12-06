import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarouselItem } from 'app/model-props/carousel-item';
import { Router } from '@angular/router';

@Component({
  selector: 'org-carousel',
  templateUrl: './org-carousel.component.html',
  styleUrls: ['./org-carousel.component.scss'],
})
export class OrgCarouselComponent implements OnInit, OnDestroy {

  secondsInterval = 8;
  currentImage = 0;
  intervalId: any;

  banners: CarouselItem[] = [
    {
      mobile: 'assets/imgs/banners/01_mobile.jpg',
      tablet: 'assets/imgs/banners/01_tablet.jpg',
      web: 'assets/imgs/banners/01_web.jpg',
      action: 'categories',
    },
    {
      mobile: 'assets/imgs/banners/02_mobile.jpg',
      tablet: 'assets/imgs/banners/02_tablet.jpg',
      web: 'assets/imgs/banners/02_web.jpg',
      action: 'hplc-column',
    },
    {
      mobile: 'assets/imgs/banners/03_mobile.jpg',
      tablet: 'assets/imgs/banners/03_tablet.jpg',
      web: 'assets/imgs/banners/03_web.jpg',
      action: 'mini-parasep',
    },
    {
      mobile: 'assets/imgs/banners/04_mobile.png',
      tablet: 'assets/imgs/banners/04_tablet.png',
      web: 'assets/imgs/banners/04_web.png',
      action: 'standards',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.startImageAutoChange();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }


  startImageAutoChange(): void {
    this.intervalId = setInterval(() => {
      this.currentImage = (this.currentImage + 1) % this.banners.length;
    }, this.secondsInterval * 1000);
  }

  setImageByIndex(index: number): void {
    if (index >= 0 && index < this.banners.length) {
      this.currentImage = index;

      clearInterval(this.intervalId);
      this.startImageAutoChange();
    }
  }

  open(item:CarouselItem) {
    switch (item.action) {
      case 'categories': {
        const el = document.getElementById('categories');
        el?.scrollIntoView();
        break;
      }

      case 'hplc-column': {
        this.router.navigate(['products'], {
            queryParams: {
              searchTerm: 'hplc column',
            }
        });
        break;
      }

      case 'mini-parasep': {
        this.router.navigate(['products'], {
          queryParams: {
            searchTerm: 'Mini Parasep',
          }
        });
        break;
      }

      case 'standards': {
        this.router.navigate(['products'], {
          queryParams: {
            category: 'standards',
          }
        });
        break;
      }

      default: {
        break;
      }
    }
  }
}
