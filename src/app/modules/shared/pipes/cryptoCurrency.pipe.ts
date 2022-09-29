import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cryptocurrency' })
export class CryptoCurrencyPipe implements PipeTransform {
  transform(num: number, sym: string = '', fixed: number = 2): string {
		return num
		? num.toFixed(fixed).replace(/\d(?=(\d{3})+\.)/g, '$&,') + (sym ? ` ${sym}` : '')
		: '0';
	}
}