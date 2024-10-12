import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'app/auth/auth.service';
import { CardSizeClass } from 'app/components/ui/org-products-grid/org-products-grid.component';
import { Product } from 'app/model/product';

@Component({
  selector: 'org-product-card',
  templateUrl: './org-product-card.component.html',
  styleUrl: './org-product-card.component.scss',
})
export class ProductCardComponent implements OnInit {
  @Input()
  product!: Product;

  @Input()
  cardSizeClass: CardSizeClass = 'product-card-size-detail';

  presentationImgPath: string = 'assets/imgs/presentations/undefined.svg';
  brandImgPath: string | null = 'assets/icons/default-brand.svg';
  hasExistingStock: boolean = false;
  isLogged: boolean = false;

  constructor(
    public authService: AuthService,
    private store: Store<any>,
  ) {
    this.store.subscribe((state) => {
      this.isLogged = state.user.isLogged;
    });
  }

  ngOnInit(): void {
    this.setPresentationImage();
    this.setBrandImage();
    this.setHasExistingStock();
  }

  private setHasExistingStock() {
    this.hasExistingStock =
      this.product?.hasStock && (this.product?.existingStockQuantity || 0) > 0;
  }

  private setPresentationImage() {
    switch (this.product?.presentationTypeKey) {
      case 'ampolleta':
        this.presentationImgPath = 'assets/imgs/presentations/ampolleta.png';
        break;
      case 'blister':
        this.presentationImgPath = 'assets/imgs/presentations/blister.png';
        break;
      case 'bolsa_de_aluminio':
        this.presentationImgPath =
          'assets/imgs/presentations/bolsa_de_aluminio.png';
        break;
      case 'bolsadealuminio':
        this.presentationImgPath =
          'assets/imgs/presentations/bolsadealuminio.png';
        break;
      case 'bote_de_plastico':
        this.presentationImgPath =
          'assets/imgs/presentations/bote_de_plastico.png';
        break;
      case 'botedeplastico':
        this.presentationImgPath =
          'assets/imgs/presentations/botedeplastico.png';
        break;
      case 'caja':
        this.presentationImgPath = 'assets/imgs/presentations/caja.png';
        break;
      case 'capacitacion':
        this.presentationImgPath = 'assets/imgs/presentations/capacitacion.svg';
        break;
      case 'frasco_de_vidrio':
        this.presentationImgPath =
          'assets/imgs/presentations/frasco_de_vidrio.png';
        break;
      case 'frasco':
        this.presentationImgPath = 'assets/imgs/presentations/frasco.png';
        break;
      case 'publicacion':
        this.presentationImgPath = 'assets/imgs/presentations/publicacion.svg';
        break;
      case 'vial':
        this.presentationImgPath = 'assets/imgs/presentations/vial.png';
        break;
    }
  }

  private setBrandImage() {
    switch (this.product?.brandName) {
      case 'BP':
        this.brandImgPath = 'assets/imgs/brands/british_pharmacopoeia.png';
        break;
      case 'EP':
        this.brandImgPath = 'assets/imgs/brands/edqm.svg';
        break;
      case 'CHEMSERVICE':
        this.brandImgPath = 'assets/imgs/brands/feum.svg';
        break;
      case 'LGC STANDARDS':
        this.brandImgPath = 'assets/imgs/brands/lgc.svg';
        break;
      case 'PHARMAFFILIATES':
        this.brandImgPath = 'assets/imgs/brands/pharmaffiliates.png';
        break;
      case 'TLC':
        this.brandImgPath = 'assets/imgs/brands/tlc.svg';
        break;
      case 'TORONTO RESEARCH CHEMICALS INC.':
        this.brandImgPath = 'assets/imgs/brands/trc.svg';
        break;
      case 'USP':
        this.brandImgPath = 'assets/imgs/brands/usp.svg';
        break;
      default:
        this.brandImgPath = null;
    }
  }
}
