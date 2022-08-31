import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component'
import { MaterialModule } from './modules/material.module'
import { CryptoCurrencyPipe } from './pipes/cryptoCurrency.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    CryptoCurrencyPipe
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    LoadingSpinnerComponent,
    MaterialModule,
    CryptoCurrencyPipe,
    FlexLayoutModule,
  ]
})

export class SharedModule {

}