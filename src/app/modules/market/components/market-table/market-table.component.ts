import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { marketData, marketAsset } from '../../models/market-table.model';
import { getMarketState, isMarketTableLoading } from '../../store/market.selectors';
import { marketTableStart } from '../../store/market.actions';

@Component({
  selector: 'market-table',
  templateUrl: './market-table.component.html',
  styleUrls: ['./market-table.component.scss']
})

export class MarketTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  marketTableLoading$ = this.store.select(isMarketTableLoading);
  marketTableData$ = this.store.select(getMarketState)

  displayedColumns: string[] = ['rank', 'name',  'price', 'change', 'cap', 'volume', 'supply', 'sparklines']
  noMarketData: marketAsset[] = [<marketAsset>{}]
  dataSource: MatTableDataSource<marketAsset> = new MatTableDataSource<marketAsset>(this.noMarketData)

  marketDataSub: Subscription = this.marketTableData$
    .subscribe(assets => this.initializeData(assets))

  constructor(
    private store: Store<{ market: marketData }>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(marketTableStart())
  }

  ngAfterViewInit(): void {
    
  }

  ngOnDestroy(): void {
    this.marketDataSub.unsubscribe()
  }

  parseNumber(num: number): string {
    console.log(num)
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  private initializeData(assets: marketAsset[]): void {
    const sourceData = assets.length ? assets : this.noMarketData
    console.log(sourceData)
    this.dataSource = new MatTableDataSource<marketAsset>(sourceData)
    this.dataSource.paginator = this.paginator
  }

}
