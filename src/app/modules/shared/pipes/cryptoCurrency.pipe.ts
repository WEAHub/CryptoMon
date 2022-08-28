import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cryptocurrency' })
export class CryptoCurrencyPipe implements PipeTransform {
  transform(num: number, sym: string): string {
		return num ? num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + ` ${sym}` : '';
	}
}