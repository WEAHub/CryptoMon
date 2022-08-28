import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MarketRoutingModule } from "./market-routing.module";

import { MarketComponent } from './components/market/market.component';
import { MarketTableComponent } from './components/market-table/market-table.component';

@NgModule({
  declarations: [
    MarketComponent,
    MarketTableComponent
  ],
  imports: [
		SharedModule,
    MarketRoutingModule
  ]
})

export class MarketModule { }
