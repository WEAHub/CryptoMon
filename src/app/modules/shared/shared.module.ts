import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './modules/material.module'
import { PipesModule } from './pipes/pipes.module';

import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component'
import { RequestService } from './services/http-requests.module';
import { ModalErrorComponent } from './components/modal-error/modal-error.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { TradingviewChartComponent } from './components/tradingview-chart/tradingview-chart.component';
import { MatTableResponsiveModule } from './directives/mat-table-responsive/mat-table-responsive.module';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    ModalErrorComponent,
    ModalConfirmComponent,
    TradingviewChartComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule,
  ],
  exports: [
    CommonModule,
    LoadingSpinnerComponent,
    ModalErrorComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    TradingviewChartComponent,
    MatTableResponsiveModule
    
  ],
  providers: [
    RequestService
  ]
})

export class SharedModule {}