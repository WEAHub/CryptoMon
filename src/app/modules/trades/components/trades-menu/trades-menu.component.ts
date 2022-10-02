import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ITradesStore } from '../../models/trades.model';
import { totalInvested } from '../../store/trades.selectors';

import { TradesAddModalComponent } from '../trades-add-modal/trades-add-modal.component';

@Component({
  selector: 'app-trades-menu',
  templateUrl: './trades-menu.component.html',
  styleUrls: ['./trades-menu.component.scss']
})
export class TradesMenuComponent implements OnInit {

  getTotalInvested$ = this.store.select(totalInvested)

  constructor(
    public dialog: MatDialog,
    private store: Store<{ trades: ITradesStore }>
  ) { }

  openDialog(): void {

    const dialogRef = this.dialog.open(TradesAddModalComponent, {
      width: '240px',
      data: {
        title: 'Add new trade',
        modalType: 'ADD',
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });

  }

  ngOnInit(): void {

  }

}
