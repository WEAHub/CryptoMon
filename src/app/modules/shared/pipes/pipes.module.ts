import { NgModule } from '@angular/core';
import { CryptoCurrencyPipe } from './cryptoCurrency.pipe';
import { DateAgoPipe } from './dateAgo.pipe';

@NgModule({
	declarations: [
    CryptoCurrencyPipe,
    DateAgoPipe,
	],
	exports: [
    CryptoCurrencyPipe,
    DateAgoPipe,
	]
})

export class PipesModule {}