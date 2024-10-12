import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { PriceOffert } from 'app/model/price-offert';
import { Product } from 'app/model/product';
import { ProductsService } from 'app/services/products.service';
import { QuotesService } from 'app/services/quotes.service';

@Component({
  selector: 'org-product-details-card',
  templateUrl: './org-product-details-card.component.html',
  styleUrl: './org-product-details-card.component.scss',
})
export class OrgProductDetailsCardComponent implements OnChanges {
  isControlled: boolean = false;
  isLogged: boolean = false;

  productUnits: number = 1;

  presentationImgPath: string = 'assets/imgs/presentations/undefined.svg';
  brandImgPath: string | null = null;

  @Input()
  product?: Product;

  offert: PriceOffert | null = null;

  constructor(
    private quoteService: QuotesService,
    private productsService: ProductsService,
    private store: Store<any>,
  ) {
    this.store.subscribe((state) => {
      this.isLogged = state.user.isLogged;
      this.loadPriceOffer();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    let product: SimpleChange = changes['product'];
    if (product) {
      this.setPresentationImage();
      this.setBrandImage();
      this.loadPriceOffer();
      this.isControlled = this.product?.controlled ? true : false;
    }
  }

  updateProductUnits(delta: number) {
    this.productUnits += delta;

    if (this.productUnits < 1) {
      this.productUnits = 1;
    }
  }

  async loadPriceOffer() {
    if (this.isLogged && this.product) {
      this.offert = await this.productsService.getProductOffer(
        this.product.idProduct,
      );
    } else {
      this.offert = null;
    }
  }

  addToQuotation() {
    this.quoteService.addProduct(this.product!, this.productUnits);
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
