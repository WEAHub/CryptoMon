import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component'
import { MaterialModule } from './material.module'

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule
     ],
    exports: [
        CommonModule,
        LoadingSpinnerComponent,
        MaterialModule
    ]
})

export class SharedModule {}