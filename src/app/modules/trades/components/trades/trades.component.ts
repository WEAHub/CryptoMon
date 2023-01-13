import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tradesMessage } from '@modules/trades/store/trades.selectors';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ITrade, ITradesInvest, ITradesStore } from '../../models/trades.model';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss']
})
export class TradesComponent implements OnInit {

  tradesMessage$ = this.store.select(tradesMessage)
  messageSub: Subscription = this.tradesMessage$.subscribe(
    message => {
      if(message.length) 
        this._snackBar.open(
          message, 
          'close',
          { duration: 2 * 1000}
        );
    }
  )

  constructor(
    private _snackBar: MatSnackBar,
    private store: Store<{ trades: ITradesStore }>,
  ) { }

  ngOnInit(): void {

  }


}
