import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CryptosRoutingModule } from "./cryptos-routing.module";
import { CryptosComponent } from './cryptos/cryptos.component';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CryptosComponent],
  imports: [
    CommonModule,
		SharedModule,
    CryptosRoutingModule,
  ]
})

export class CryptosModule {}