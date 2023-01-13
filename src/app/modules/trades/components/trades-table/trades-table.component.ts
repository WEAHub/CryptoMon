import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { delay, Subscription, tap, distinctUntilChanged, withLatestFrom, take, distinct, Observable, combineLatest, combineLatestAll } from 'rxjs';
import { ModalConfirmComponent } from '@shared/components/modal-confirm/modal-confirm.component';
import { ConfigService } from '@shared/services/config/config.service';;

import { ITrade, ITradeAlertFinished, ITradesInvest, ITradeUpdate } from '../../models/trades.model';
import { ITradesStore } from '../../models/trades.model';
import { alertFinished, showSnackBarMsg, tradesDelete, tradesGet } from '../../store/trades.actions';
import { getTrades, tradesLoaded, tradesLoading } from '../../store/trades.selectors';
import { TradesAddModalComponent } from '../trades-add-modal/trades-add-modal.component';
import { TradesAlertModalComponent } from '../trades-alert-modal/trades-alert-modal.component';
import { TradesChartModalComponent } from '../trades-chart-modal/trades-chart-modal.component';

import { TradesRealTimeService } from '@modules/trades/services/trades-realtime.service';
import { TradesDataService } from '@modules/trades/services/trades-data.service';

import { calcTotalInvest, checkAlerts, updateTrades } from '@modules/trades/utils/trade.functions';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-trades-table',
  templateUrl: './trades-table.component.html',
  styleUrls: ['./trades-table.component.scss']
})
export class TradesTableComponent implements OnInit, OnDestroy {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isTradesLoading$ = this.store.select(tradesLoading)
  isTradesLoaded$ = this.store.select(tradesLoaded)
  getTrades$ = this.store.select(getTrades)

  dataColumns: string[] = ['exchange', 'pairs', 'tradeType', 'quantity', 'price', 'actualprice', 'percentchange', 'when', 'actions']
  noDataColumns: string[] = ['no-data-row']

  noTradesData: ITrade[] = [<ITrade>{}]
  emptyData: MatTableDataSource<any> = new MatTableDataSource(this.noTradesData)
  dataSource: MatTableDataSource<any> = this.emptyData;

  tradesDataSub: Subscription = this.getTrades$
    .subscribe(trades => {
      this.initializeData(trades)
      console.log('[Trades] Initialize trades')
    })

  updatedTrades: Observable<ITradeUpdate[]> = this.tradesSocket.getUpdatedTrades()
  .pipe(
    delay(5000),
    tap((trades: ITradeUpdate[]) => {
      console.log('[Trades] Update trades')
      this.updateDataSource(trades)
      this.tradesSocket.emitUpdateTrades(this.dataSource.data)
    }),
  )

  updatedTradesSub: Subscription = this.updatedTrades.subscribe()

  constructor(
    private store: Store<{ trades: ITradesStore }>,
    private tradesSocket: TradesRealTimeService,
    private tradesData: TradesDataService,
    public configService: ConfigService,
    public deleteDialog: MatDialog,
    public modifyDialog: MatDialog,
    public chartDialog: MatDialog,
    public alertDialog: MatDialog,
  ) {

    tradesSocket.onConnect = this.onSocketConnect.bind(this)
    tradesSocket.onDisconnect = this.onSocketDisconnect.bind(this)

  }

  ngOnInit(): void {
    this.tradesSocket.connect();
  }

  ngOnDestroy(): void {
    this.stopUpdateTrades()
    this.tradesDataSub.unsubscribe();
  }

  stopUpdateTrades() {
    this.updatedTradesSub.unsubscribe();
    this.tradesSocket.disconnect();
  }

  onSocketConnect() {
    console.log('[TRADE SOCKET] Connect')
    this.store.dispatch(showSnackBarMsg({ message: 'Socket connected! Prices will update in real time'}))
    this.store.dispatch(tradesGet())
  }

  onSocketDisconnect() {
    console.log('[TRADE SOCKET] Disconnect')
    this.store.dispatch(showSnackBarMsg({ message: 'Socket disconnected!' }))
  }
  
  get tableData() {    

    const checkData: boolean = this.dataSource.data.length > 0 
    && this.dataSource.filteredData.length > 0
    && this.dataSource.data !== this.noTradesData

    const columns: string[] = checkData ? this.dataColumns : this.noDataColumns
    const dataSource: MatTableDataSource<ITrade> = checkData ? this.dataSource : this.emptyData

    return {
      columns,
      dataSource
    }

  }

  deleteTrade(trade: ITrade): void {
    const dialogRef = this.deleteDialog.open(ModalConfirmComponent, {
      width: '250px',
      panelClass: 'black-modal',
      data: {message: 'Are you sure of delete this trade?'}
    });

    dialogRef.afterClosed().subscribe(answer => {
      if(answer) {
        this.store.dispatch(tradesDelete(trade))
      }
    });
  }

  modifyTrade(trade: ITrade): void {
    this.modifyDialog.open(TradesAddModalComponent, {
      width: '250px',
      panelClass: ['black-modal', 'add-trade-modal'],
      data: {
        title: 'Modify trade',
        modalType: 'MODIFY',
        trade,
      }
    });
  }

  showChart(trade: ITrade): void {
    this.chartDialog.open(TradesChartModalComponent, {
      width: '100vh',
      height: '600px',
      panelClass: ['black-modal', 'tv-chart'],
      data: {
        exchange: trade.exchangeName,
        fromSymbol: trade.fromSymbol,
        toSymbol: trade.toSymbol
      }
    })
  }

  setAlarm(trade: ITrade): void {
    const alertDialog = this.alertDialog.open(TradesAlertModalComponent, {
      width: '325px',
      panelClass: 'black-modal',
      data: {
        ...trade
      }
    })

    alertDialog.afterClosed().subscribe(result => {
      if(result) {
        this.store.dispatch(tradesGet())
      }
    })
    return
  }

  checkDataSource(trades: ITrade[]) {
    return trades.map((trade: ITrade) => {
      return {
        ...trade,
        percentType: trade.percentChange > 0 
        ? 'up'
        : trade.percentChange < 0
          ? 'down'
          : 'neutral'
      }
    }).sort((a, b) => b.timeStampAdded - a.timeStampAdded)
  }

  private initializeData(trades: ITrade[]): void {

    const sourceData = trades.length 
    ? this.checkDataSource(trades) 
    : this.noTradesData

    this.dataSource = new MatTableDataSource<ITrade>(sourceData)
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort;

    if(sourceData !== this.noTradesData) {
      this.resetUpdateEvent()
      this.tradesSocket.emitUpdateTrades(this.dataSource.data)
      this.tradesData.updateInvest(calcTotalInvest(sourceData))
      this.fireAlerts(sourceData)
    }

  }

  resetUpdateEvent() {
    this.updatedTradesSub.unsubscribe();
    this.updatedTradesSub = this.updatedTrades.subscribe()
  }

  updateDataSource(trades: ITradeUpdate[]) {
    const updatedData = updateTrades(this.dataSource.data, trades);
    this.dataSource = new MatTableDataSource<ITrade>(updatedData)
    this.tradesData.updateInvest(calcTotalInvest(updatedData))
    this.fireAlerts(updatedData)
  }

  fireAlerts(trades: ITrade[]) {
    const alertsFired = checkAlerts(trades)
    if(alertsFired.length) {
      this.tradesData.updateAlerts(alertsFired)
    }
  }
  
  finishAlert(trade: ITrade) {
    this.updatedTradesSub.unsubscribe()

    const finishAlertPayload: ITradeAlertFinished = {
      tradeId: trade._id,
      alertId: trade.alert?._id
    }

    this.store.dispatch(alertFinished(finishAlertPayload))

  }


  tsToDate(timestamp: number) {
    return new Date(timestamp).toString();
  }



}
