
import { NgModule } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  exports: [
    MatSidenavModule,
		MatListModule,
		MatIconModule,
		MatToolbarModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatProgressSpinnerModule,
		MatCardModule,
		MatGridListModule,
		MatDialogModule
  ],
})

export class MaterialModule {}