import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { marketData, marketAssetAdded } from '../../models/market-table.model';
import { getMarketAddedState, isMarketTableAddedLoaded, isMarketTableAddedLoading } from '../../store/market.selectors';
import { marketTableAddedStart } from '../../store/market.actions';
import { ConfigService } from '@shared/services/config/config.service';

@Component({
  selector: 'market-table-added',
  templateUrl: './market-table-added.component.html',
  styleUrls: ['./market-table-added.component.scss'],
})

export class MarketTableAddedComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  marketTableData$ = this.store.select(getMarketAddedState)
  marketTableAddedLoaded$ = this.store.select(isMarketTableAddedLoaded)
  
  displayedColumns: string[] = ['index', 'name',  'price', 'added']
  noMarketData: marketAssetAdded[] = [<marketAssetAdded>{}]
  emptyData: MatTableDataSource<marketAssetAdded> = new MatTableDataSource<marketAssetAdded>(this.noMarketData)
  dataSource: MatTableDataSource<marketAssetAdded> = this.emptyData;

  marketDataSub: Subscription = this.marketTableData$
    .subscribe(assets => this.initializeData(assets))

  constructor(
    private store: Store<{ market: marketData }>,
    public configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.store.dispatch(marketTableAddedStart())
  }

  ngOnDestroy(): void {
    this.marketDataSub.unsubscribe()
  }

  private initializeData(assets: marketAssetAdded[]): void {
    const sourceData = assets.length ? assets : this.noMarketData
    this.dataSource = new MatTableDataSource<marketAssetAdded>(sourceData)
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort;
  }
  
  doFilter(searchValue: string): void {
    this.dataSource.filter = searchValue.trim().toLocaleLowerCase();
  }
}