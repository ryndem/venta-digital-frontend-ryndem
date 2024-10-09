import { Pipe, PipeTransform } from "@angular/core";


@Pipe({name: 'usdCurrency'})
export class UsdCurrencyPipe implements PipeTransform {

    transform(value: any) {
        
        const formatter = new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency: 'USD'
        });

        return `${formatter.format(value || 0)} USD`;
    }
    
}