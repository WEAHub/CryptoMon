import { MatDatetimePickerInputEvent } from '@angular-material-components/datetime-picker';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IPair, IPrice, ITradesAdd, ITradesModalPriceLoad } from '../../models/trades-modal.model';

import { ITradesStore } from '../../models/trades.model';
import { IExchange } from '../../models/trades-modal.model';

import { 
  tradesAdd,
  tradesModalLoadExchanges, 
  tradesModalLoadPairs, 
  tradesModalLoadPrice
} from '../../store/trades.actions';

import { 
  tradesModalGetExchanges, 
  tradesModalGetPairs, 
  tradesModalGetPrice, 
  tradesModalLoading 
} from '../../store/trades.selectors';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-trades-add-modal',
  templateUrl: './trades-add-modal.component.html',
  styleUrls: ['./trades-add-modal.component.scss']
})

export class TradesAddModalComponent implements OnDestroy  {
  @ViewChild('picker') picker: any;
  
  isLoading$ = this.store.select(tradesModalLoading)
  getExchanges$ = this.store.select(tradesModalGetExchanges)
  getPairs$ = this.store.select(tradesModalGetPairs);
  getPrice$ = this.store.select(tradesModalGetPrice);

  filteredExchanges: IExchange[] = [<IExchange>{}]
  filteredPairs: IPair[] = [<IPair>{}]

  exchangesSub: Subscription
  pairsSub: Subscription
  priceSub: Subscription
  priceData: IPrice = <IPrice>{}
  tradeForm: FormGroup
  dateTrade = new FormControl(null)

  constructor(
    public configService: ConfigService,
    public dialogRef: MatDialogRef<TradesAddModalComponent>,
    private store: Store<{ trades: ITradesStore }>,
  ) {

    this.tradeForm = new FormGroup({
      exchanges: new FormControl('', [Validators.required]),
      pairs: new FormControl('', [Validators.required]),
      dateTrade: new FormControl('', [Validators.required]),
      tradeType: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required])
    })

    this.loadExchanges();

    this.exchangesSub = this.getExchanges$.subscribe(
      (exchanges: IExchange[]) => this.filteredExchanges = exchanges
    )

    this.pairsSub = this.getPairs$.subscribe(
      (pairs: IPair[]) => this.filteredPairs = pairs
    )

    this.priceSub = this.getPrice$.subscribe((price: IPrice) => {
      this.priceData = price
      this.tradeForm.get('price')?.setValue(this.priceData.price)
    })

  }

  ngOnDestroy(): void {
    this.exchangesSub.unsubscribe();
    this.pairsSub.unsubscribe();
    this.priceSub.unsubscribe();
  }

  private loadExchanges(): void {
    this.store.dispatch(tradesModalLoadExchanges());
  }

  selectExchange(exchangeName: string) {
    this.store.dispatch(tradesModalLoadPairs({exchangeName}))
  }

  changeDate(event: MatDatetimePickerInputEvent<any>) {
    
    const date: Date =  new Date(event.value);    
    this.tradeForm.get('dateTrade')?.setValue(date)

    const ts: number = new Date(date).getTime();
    const [ fromSymbol, toSymbol ] = this.tradeForm.get('pairs')?.value.split('/');    
    const pairData: ITradesModalPriceLoad = {
      exchangeName: this.tradeForm.get('exchanges')?.value,
      fromSymbol,
      toSymbol,
      timeStamp: ts,
    }

    this.store.dispatch(tradesModalLoadPrice(pairData))

  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  
  onSubmit(): void {
    console.log(this.tradeForm)
    if(this.tradeForm.invalid) return
    
    const pairs: string[] = this.tradeForm.get('pairs')?.value.split('/');
    const ts: number = new Date(this.tradeForm.get('dateTrade')?.value).getTime();

    const addTradeRequest: ITradesAdd = {
      exchangeName: this.tradeForm.get('exchanges')?.value,
      fromSymbol: pairs[0],
      toSymbol: pairs[1],
      timeStamp: ts,
      tradeType: this.tradeForm.get('tradeType')?.value,
      price: this.tradeForm.get('price')?.value,
      quantity: Number(this.tradeForm.get('quantity')?.value)
    }

    this.store.dispatch(tradesAdd(addTradeRequest));
    this.closeDialog();
  }
}
