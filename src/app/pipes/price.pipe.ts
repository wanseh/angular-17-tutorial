import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true,
})
export class PricePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    // append a dollar sign to the price
    return `${value}$`;
  }
}
