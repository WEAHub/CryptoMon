import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './modules/material.module'
import { PipesModule } from './pipes/pipes.module';
import { MatTableResponsiveModule } from './directives/mat-table-responsive/mat-table-responsive.module';
import { SharedServicesModule } from './services/shared-services.module';
import { SharedComponentsModule } from './components/shared-components.module';

@NgModule({
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableResponsiveModule,
    PipesModule,
    SharedServicesModule,
    SharedComponentsModule
  ]
})

export class SharedModule {}