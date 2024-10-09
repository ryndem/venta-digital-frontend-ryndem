import { Injectable } from '@angular/core';
import { Product } from 'app/model/product';
import { QuoteProduct } from 'app/model/quote-product';

@Injectable({
  providedIn: 'root'
})
export class QuotesService {

  products: QuoteProduct[] = [];

  constructor() { }


  addProduct(product: Product, quantity: number) {

    const temp = this.products.find(p => p.product.idProduct == product.idProduct);

    if (!temp) {
      this.products.push({product: product, quantity: quantity});
    } else {
      temp.quantity = quantity;
    }

    alert(`Product with id: ${product.idProduct}, was added with: ${quantity} units`);

  }

  removeProduct(productId: string) {
    const productIndex = this.products.findIndex(p => p.product.idProduct == productId);

    if (productIndex > -1) {
      this.products.splice(productIndex, 1);
    }

  }

}
