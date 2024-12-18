import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'usdCurrency' })
export class UsdCurrencyPipe implements PipeTransform {
  transform(value: number | undefined | null): string {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });

    return `${formatter.format(value ?? 0)} USD`;
  }
}
