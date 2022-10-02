import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TradesRoutingModule } from "./trades-routing.module";
import { TradesComponent } from './components/trades/trades.component';
import { TradesTableComponent } from './components/trades-table/trades-table.component';
import { TradesMenuComponent } from './components/trades-menu/trades-menu.component';
import { TradesAddModalComponent } from './components/trades-add-modal/trades-add-modal.component';
import { TradesChartModalComponent } from './components/trades-chart-modal/trades-chart-modal.component';


@NgModule({
  declarations: [
    TradesComponent,
    TradesTableComponent,
    TradesMenuComponent,
    TradesAddModalComponent,
    TradesChartModalComponent
  ],
  imports: [
		SharedModule,
    TradesRoutingModule,
  ]
})

export class TradesModule {}