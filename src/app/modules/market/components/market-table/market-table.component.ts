import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { marketData, marketAsset } from '../../models/market-table.model';
import { getMarketState, isMarketTableLoaded } from '../../store/market.selectors';
import { marketTableStart } from '../../store/market.actions';

@Component({
  selector: 'market-table',
  templateUrl: './market-table.component.html',
  styleUrls: ['./market-table.component.scss']
})

export class MarketTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  marketTableData$ = this.store.select(getMarketState)
  marketTableLoaded$ = this.store.select(isMarketTableLoaded)

  displayedColumns: string[] = ['rank', 'name',  'price', 'change', 'cap', 'volume', 'supply', 'sparklines']
  noMarketData: marketAsset[] = [<marketAsset>{}]
  emptyData: MatTableDataSource<marketAsset> = new MatTableDataSource(this.noMarketData)
  dataSource: MatTableDataSource<marketAsset> = this.emptyData;
  marketDataSub: Subscription = this.marketTableData$
    .subscribe(assets => this.initializeData(assets))

  constructor(
    private store: Store<{ market: marketData }>,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(marketTableStart())
  }

  ngOnDestroy(): void {
    this.marketDataSub.unsubscribe()
  }

  private initializeData(assets: marketAsset[]): void {
    const sourceData = assets.length ? assets : this.noMarketData
    this.dataSource = new MatTableDataSource<marketAsset>(sourceData)
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort;
  }
  
  doFilter(searchValue: string): void {
    this.dataSource.filter = searchValue.trim().toLocaleLowerCase();
  }
}