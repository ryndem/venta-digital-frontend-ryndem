import { Injectable } from '@angular/core';
import { Product } from 'app/model/product';

@Injectable({
  providedIn: 'root',
})
export class ImageService {

  constructor() {}

  getPresentationImage(product: Product | null): string {
    switch (product?.presentationTypeKey) {
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
      default: return 'assets/imgs/presentations/undefined.svg';
    }
  }

  getBrandImage(product: Product | null) : string | null {
    switch (product?.brandName) {
      case 'BP': return 'assets/imgs/brands/british_pharmacopoeia.png';
      case 'EP': return 'assets/imgs/brands/edqm.svg';
      case 'CHEMSERVICE': return 'assets/imgs/brands/feum.svg';
      case 'LGC STANDARDS': return 'assets/imgs/brands/lgc.svg';
      case 'PHARMAFFILIATES': return 'assets/imgs/brands/pharmaffiliates.png';
      case 'TLC': return 'assets/imgs/brands/tlc.svg';
      case 'TORONTO RESEARCH CHEMICALS INC.': return 'assets/imgs/brands/trc.svg';
      case 'USP': return 'assets/imgs/brands/usp.svg';
      default: return null;
    }
  }
}
