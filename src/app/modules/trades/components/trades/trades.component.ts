import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ITrade, ITradesInvest, ITradesStore } from '../../models/trades.model';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss']
})
export class TradesComponent implements OnInit {

  totalInvest!: ITradesInvest

  constructor(
    private store: Store<{ trades: ITradesStore }>,
  ) { }

  ngOnInit(): void {

  }

  setTotalInvest(tradesInvest: ITradesInvest): void {
    this.totalInvest = tradesInvest
  }

}
