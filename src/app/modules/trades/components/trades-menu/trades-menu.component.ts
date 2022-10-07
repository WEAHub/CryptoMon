import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TradesDataService } from '@modules/trades/services/trade-data.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ITradesInvest, ITradesStore } from '../../models/trades.model';

import { TradesAddModalComponent } from '../trades-add-modal/trades-add-modal.component';

@Component({
  selector: 'app-trades-menu',
  templateUrl: './trades-menu.component.html',
  styleUrls: ['./trades-menu.component.scss']
})
export class TradesMenuComponent implements OnInit, OnDestroy {

  tradesInvest!: ITradesInvest
  tradesDataSub!: Subscription

  constructor(
    public dialog: MatDialog,
    private store: Store<{ trades: ITradesStore }>,
    private tradesData: TradesDataService
  ) { }

  openDialog(): void {

    const dialogRef = this.dialog.open(TradesAddModalComponent, {
      width: '240px',
      panelClass: ['black-modal', 'add-trade-modal'],
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
    this.tradesDataSub = this.tradesData.investData.subscribe(investData => this.tradesInvest = investData)
  }

  ngOnDestroy(): void {
    this.tradesDataSub.unsubscribe()
  }

}
