import { Component, OnDestroy, OnInit } from '@angular/core';
import { CarouselItem } from 'app/model-props/carousel-item';
import { Router } from '@angular/router';

/**
 * Full Carousel component
 * @export
 * @class OrgCarouselComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'org-carousel',
  templateUrl: './org-carousel.component.html',
  styleUrls: ['./org-carousel.component.scss'],
})
export class OrgCarouselComponent implements OnInit, OnDestroy {

  /**
   * Interval in seconds between carrousel transition
   */
  secondsInterval = 8;

  /**
   * Start image index
   */
  currentImage = 0;

  /**
   * Interval id to update/delete transition
   * @type {(number | null)}
   */
  intervalId: number | null = null;


  /**
   * Banner list
   * @type {CarouselItem[]}
   */
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

  /**
   * Creates an instance of OrgCarouselComponent.
   * @param {Router} router
   */
  constructor(private router: Router) {}

  /**
   * Initializing method
   */
  ngOnInit(): void {
    this.startImageAutoChange();
  }

  /**
   * Detroy component method
   */
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  /**
   * Init image treansitions
   */
  startImageAutoChange(): void {
    this.intervalId = window.setInterval(() => {
      this.currentImage = (this.currentImage + 1) % this.banners.length;
    }, this.secondsInterval * 1000);
  }


  /**
   * Update carousel item 
   * @param {number} index
   */
  setImageByIndex(index: number): void {
    if (index >= 0 && index < this.banners.length) {
      this.currentImage = index;

      if (this.intervalId !== null) {
        clearInterval(this.intervalId);
      }
      this.startImageAutoChange();
    }
  }

  /**
   * Method to manage item actions
   * @param {CarouselItem} item
   */
  open(item: CarouselItem) {
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
