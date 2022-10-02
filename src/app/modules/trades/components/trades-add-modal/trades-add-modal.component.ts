import { MatDatetimePickerInputEvent } from '@angular-material-components/datetime-picker';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IPair, IPrice, ITradesAdd, ITradesModalPriceLoad, ITradesModify } from '../../models/trades-modal.model';

import { ITrade, ITradesStore } from '../../models/trades.model';
import { IExchange } from '../../models/trades-modal.model';

import { 
  tradesAdd,
  tradesModalLoadExchanges, 
  tradesModalLoadPairs, 
  tradesModalLoadPrice,
  tradesModalLoadPriceSuccess,
  tradesModify
} from '../../store/trades.actions';

import { 
  tradesModalGetExchanges, 
  tradesModalGetPairs, 
  tradesModalGetPrice, 
  tradesModalLoading 
} from '../../store/trades.selectors';
import { ConfigService } from 'src/app/services/config.service';

enum EModalType {
  ADD = 'ADD',
  MODIFY = 'MODIFY'
}

interface modalData {
  title: string,
  modalType: EModalType,
  trade: ITrade | undefined,
}

@Component({
  selector: 'app-trades-add-modal',
  templateUrl: './trades-add-modal.component.html',
  styleUrls: ['./trades-add-modal.component.scss']
})

export class TradesAddModalComponent implements OnInit, OnDestroy  {
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
  dateTrade: FormControl = new FormControl(null)

  dateValue: FormControl = this.data.modalType === EModalType.MODIFY
  ? new FormControl(new Date(this.data.trade?.timeStamp!).toISOString())
  : new FormControl(new Date().toISOString())

  // TRUE = buy - FALSE = sell
  selectedTradeType: boolean = this.data.trade?.tradeType == 'buy'

  constructor(
    public configService: ConfigService,
    public dialogRef: MatDialogRef<TradesAddModalComponent>,
    private store: Store<{ trades: ITradesStore }>,
    @Inject(MAT_DIALOG_DATA) public data: modalData
  ) {
    
    this.loadExchanges();

    this.tradeForm = new FormGroup({
      exchanges: new FormControl(this.data.trade?.exchangeName, [Validators.required]),
      pairs: new FormControl(`${this.data.trade?.fromSymbol}/${this.data.trade?.toSymbol}`, [Validators.required]),
      dateTrade: new FormControl(new Date(this.data.trade?.timeStamp!), [Validators.required]),
      tradeType: new FormControl(this.data.trade?.tradeType, [Validators.required]),
      quantity: new FormControl(this.data.trade?.quantity, [Validators.required]),
      price: new FormControl(this.data.trade?.price, [Validators.required])
    })
    

    this.exchangesSub = this.getExchanges$.subscribe(
      (exchanges: IExchange[]) => this.filteredExchanges = exchanges
    )

    this.pairsSub = this.getPairs$.subscribe(
      (pairs: IPair[]) => this.filteredPairs = pairs
    )
    
    this.priceSub = this.getPrice$.subscribe(
      (price: IPrice) => {
        this.priceData = price
        this.tradeForm.get('price')?.setValue(this.priceData.price)
      }
    )

  }

  ngOnInit(): void {

    if(this.data.modalType == EModalType.MODIFY) {

      this.selectExchange(this.data.trade?.exchangeName);

      this.store.dispatch(tradesModalLoadPriceSuccess({
        price: this.data.trade?.price!,
        toSymbol: this.data.trade?.toSymbol!
      }))
      
    }

  }

  ngOnDestroy(): void {
    this.exchangesSub.unsubscribe();
    this.pairsSub.unsubscribe();
    this.priceSub.unsubscribe();
  }

  private loadExchanges(): void {
    this.store.dispatch(tradesModalLoadExchanges());
  }

  selectExchange(exchangeName: any) {
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

    const tradeRequest: ITradesAdd = {
      exchangeName: this.tradeForm.get('exchanges')?.value,
      fromSymbol: pairs[0],
      toSymbol: pairs[1],
      timeStamp: ts,
      tradeType: this.tradeForm.get('tradeType')?.value,
      price: this.tradeForm.get('price')?.value,
      quantity: Number(this.tradeForm.get('quantity')?.value)
    }

    if(this.data.modalType == EModalType.MODIFY) {
      const tradeRequestModify: ITradesModify = {
        ...tradeRequest,
        id: this.data.trade?._id!
      }
      this.store.dispatch(tradesModify(tradeRequestModify));
    }
    else {
      this.store.dispatch(tradesAdd(tradeRequest));
    }
    
    this.closeDialog();
  }
}
