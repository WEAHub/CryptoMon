import { NgModule } from '@angular/core';
import { MaterialModule } from '../modules/material.module';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { ModalErrorComponent } from './modal-error/modal-error.component';
import { TradingviewChartComponent } from './tradingview-chart/tradingview-chart.component';



@NgModule({
  imports: [
    MaterialModule
  ],
  declarations: [
    LoadingSpinnerComponent,
    TradingviewChartComponent,
    ModalErrorComponent,
    ModalConfirmComponent,
  ],
  exports: [
    LoadingSpinnerComponent,
    TradingviewChartComponent,
    ModalErrorComponent,
    ModalConfirmComponent,
  ]
})

export class SharedComponentsModule {}