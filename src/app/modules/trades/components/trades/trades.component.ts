import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ITradesStore } from '../../models/trades.model';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss']
})
export class TradesComponent implements OnInit {

  constructor(
    private store: Store<{ trades: ITradesStore }>,
  ) { }

  ngOnInit(): void {

  }

}
