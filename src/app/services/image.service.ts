import { Injectable } from '@angular/core';
import { Product } from 'app/model/product';
import { QuoteProduct } from 'app/model/quote-product';

@Injectable({
  providedIn: 'root',
})
export class ImageService {

  constructor() {}

  getPresentationImage(product: Product | QuoteProduct | null): string {
    if (!product) return 'assets/imgs/presentations/undefined.svg';

    const key =  product.presentationTypeKey || product.typeKey;

    switch (key) {
      case 'ampolleta': return 'assets/imgs/presentations/ampolleta.png';
      case 'blister': return 'assets/imgs/presentations/blister.png';
      case 'bolsa_de_aluminio': return 'assets/imgs/presentations/bolsa_de_aluminio.png';
      case 'bolsadealuminio': return 'assets/imgs/presentations/bolsadealuminio.png';
      case 'bote_de_plastico': return 'assets/imgs/presentations/bote_de_plastico.png';
      case 'botedeplastico': return 'assets/imgs/presentations/botedeplastico.png';
      case 'caja': return 'assets/imgs/presentations/caja.png';
      case 'capacitacion': return 'assets/imgs/presentations/capacitacion.svg';
      case 'frasco_de_vidrio': return 'assets/imgs/presentations/frasco_de_vidrio.png';
      case 'frasco': return 'assets/imgs/presentations/frasco.png';
      case 'publicacion': return 'assets/imgs/presentations/publicacion.svg';
      case 'vial': return 'assets/imgs/presentations/vial.png';
      case 'publications': return 'assets/imgs/presentations/publications.svg';
      case 'training': return 'assets/imgs/presentations/training.svg';
      default: return 'assets/imgs/presentations/undefined.svg';
    }
  }

  getBrandImage(product: Product | QuoteProduct | null) : string | null {
    switch (product?.brandName) {
      case 'BP': return 'assets/imgs/brands/british_pharmacopoeia.png';
      case 'EP': return 'assets/imgs/brands/edqm.svg';
      case 'LGC STANDARDS': return 'assets/imgs/brands/lgc.svg';
      case 'PHARMAFFILIATES': return 'assets/imgs/brands/pharmaffiliates.svg';
      case 'TLC': return 'assets/imgs/brands/tlc.svg';
      case 'TORONTO RESEARCH CHEMICALS INC.': return 'assets/imgs/brands/trc.svg';
      case 'USP': return 'assets/imgs/brands/usp.svg';
      case 'MICROBIOLOGICS': return 'assets/imgs/brands/microbiologics.svg';
      case 'CYTIVA': return 'assets/imgs/brands/cytiva.svg';
      case 'APACOR': return 'assets/imgs/brands/apacor.svg';
      case 'CHROMADEX': return 'assets/imgs/brands/chroma-dex.svg';
      case 'FAPAS': return 'assets/imgs/brands/fapas.svg';
      case 'Hixwer': return 'assets/imgs/brands/hixwer.svg';
      case 'CAPE COD': return 'assets/imgs/brands/capecod.svg';
      case 'FEUM': return 'assets/imgs/brands/feum.svg';
      case 'THERMO FISHER SCIENTIFIC, INC.': return 'assets/imgs/brands/thermofisher.svg';
      default: return null;
    }
  }
}
