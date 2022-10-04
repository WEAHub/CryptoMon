import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ModalConfirmComponent } from 'src/app/modules/shared/components/modal-confirm/modal-confirm.component';
import { ConfigService } from 'src/app/services/config.service';
import { ITrade } from '../../models/trades.model';
import { ITradesStore } from '../../models/trades.model';
import { tradesDelete, tradesGet } from '../../store/trades.actions';
import { getTrades, tradesLoaded, tradesLoading } from '../../store/trades.selectors';
import { TradesAddModalComponent } from '../trades-add-modal/trades-add-modal.component';
import { TradesChartModalComponent } from '../trades-chart-modal/trades-chart-modal.component';

@Component({
  selector: 'app-trades-table',
  templateUrl: './trades-table.component.html',
  styleUrls: ['./trades-table.component.scss']
})
export class TradesTableComponent implements OnInit, OnDestroy {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getTrades$ = this.store.select(getTrades)
  isTradesLoading$ = this.store.select(tradesLoading)
  isTradesLoaded$ = this.store.select(tradesLoaded)

  dataColumns: string[] = ['exchange', 'pairs', 'tradeType', 'quantity', 'price', 'actualprice', 'percentchange', 'when', 'actions']
  noDataColumns: string[] = ['no-data-row']

  noTradesData: ITrade[] = [<ITrade>{}]
  emptyData: MatTableDataSource<any> = new MatTableDataSource(this.noTradesData)
  dataSource: MatTableDataSource<any> = this.emptyData;

  tradesDataSub: Subscription = this.getTrades$
    .subscribe(trades => this.initializeData(trades))

  constructor(
    private store: Store<{ trades: ITradesStore }>,
    public configService: ConfigService,
    public deleteDialog: MatDialog,
    public modifyDialog: MatDialog,
    public chartDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(tradesGet())
  }

  ngOnDestroy(): void {
    this.tradesDataSub.unsubscribe();
  }

  get tableData() {    

    const checkData: boolean = this.dataSource.data.length > 0 
    && this.dataSource.filteredData.length > 0
    && this.dataSource.data !== this.noTradesData

    const columns: string[] =checkData ? this.dataColumns : this.noDataColumns
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
      console.log(answer, trade)
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

    return
  }

  private initializeData(trades: ITrade[]): void {
    const sourceData = trades.length ? trades : this.noTradesData
    this.dataSource = new MatTableDataSource<ITrade>(sourceData)
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort;
  }

  tsToDate(timestamp: number) {
    return new Date(timestamp).toString();
  }

}
