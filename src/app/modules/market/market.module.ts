import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { MarketRoutingModule } from "./market-routing.module";

import { MarketComponent } from './components/market/market.component';
import { MarketTableComponent } from './components/market-table/market-table.component';
import { MarketTableAddedComponent } from './components/market-table-added/market-table-added.component';

@NgModule({
  declarations: [
    MarketComponent,
    MarketTableComponent,
    MarketTableAddedComponent
  ],
  imports: [
		SharedModule,
    MarketRoutingModule
  ]
})

export class MarketModule { }
