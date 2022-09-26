import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './modules/material.module'
import { CryptoCurrencyPipe } from './pipes/cryptoCurrency.pipe';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component'
import { RequestService } from './services/http-requests.module';
import { ModalErrorComponent } from './components/modal-error/modal-error.component';


@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    ModalErrorComponent,
    CryptoCurrencyPipe,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    LoadingSpinnerComponent,
    ModalErrorComponent,
    MaterialModule,
    CryptoCurrencyPipe,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  providers: [
    RequestService
  ]
})

export class SharedModule {}