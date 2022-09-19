import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { marketData } from '../../models/market-table.model';
import { getMarketError, marketHasError } from '../../store/market.selectors';

export interface TileComponent {
  cols: number;
  rows: number;
  text: string;
  component: any | undefined;
}

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {

  marketError$ = this.store.select(marketHasError)
  marketErrorMsg$ = this.store.select(getMarketError)

  constructor(
    private store: Store<{ market: marketData }>,
  ) { }

  ngOnInit(): void {
  }

}
