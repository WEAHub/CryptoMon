import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TradesRoutingModule } from "./trades-routing.module";
import { TradesComponent } from './components/trades/trades.component';
import { TradesTableComponent } from './components/trades-table/trades-table.component';
import { TradesMenuComponent } from './components/trades-menu/trades-menu.component';
import { TradesAddModalComponent } from './components/trades-add-modal/trades-add-modal.component';
import { TradesChartModalComponent } from './components/trades-chart-modal/trades-chart-modal.component';
import { TradesAlertModalComponent } from './components/trades-alert-modal/trades-alert-modal.component';
import { TradesRealTimeService } from './services/trades-realtime.service';
import { TradesDataService } from './services/trade-data.service';


@NgModule({
  declarations: [
    TradesComponent,
    TradesTableComponent,
    TradesMenuComponent,
    TradesAddModalComponent,
    TradesChartModalComponent,
    TradesAlertModalComponent
  ],
  imports: [
		SharedModule,
    TradesRoutingModule,
  ],
  providers:  [
    TradesRealTimeService,
    TradesDataService
  ]
})

export class TradesModule {}