import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CryptosRoutingModule } from "./cryptos-routing.module";
import { CryptosComponent } from './components/cryptos/cryptos.component';


@NgModule({
  declarations: [CryptosComponent],
  imports: [
		SharedModule,
    CryptosRoutingModule,
  ]
})

export class CryptosModule {}