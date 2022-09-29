import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ITradesStore } from '../../models/trades.model';

import { TradesAddModalComponent } from '../trades-add-modal/trades-add-modal.component';

@Component({
  selector: 'app-trades-menu',
  templateUrl: './trades-menu.component.html',
  styleUrls: ['./trades-menu.component.scss']
})
export class TradesMenuComponent implements OnInit {

constructor(
  public dialog: MatDialog,
  private store: Store<{ trades: ITradesStore }>
) { }

openDialog(): void {

  const dialogRef = this.dialog.open(TradesAddModalComponent, {
    width: '245px'
  });

  dialogRef.afterClosed().subscribe(() => {
    console.log('The dialog was closed');
  });

}

ngOnInit(): void {

}

}
