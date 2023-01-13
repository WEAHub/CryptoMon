import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAlertAdd, IAlertAddInputs, IAlertListItem, ITrade, ITradesStore, ETradeType } from '@modules/trades/models/trades.model';
import { addAlert, getAlertList } from '@modules/trades/store/trades.actions';
import { alertList, alertListLoaded } from '@modules/trades/store/trades.selectors';
import { select, Store } from '@ngrx/store';
import { distinctUntilChanged, lastValueFrom, Subscription, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-trades-alert-modal',
  templateUrl: './trades-alert-modal.component.html',
  styleUrls: ['./trades-alert-modal.component.scss']
})
export class TradesAlertModalComponent implements OnInit, OnDestroy {

  alertList$ = this.store.select(alertList)
  alertListLoaded$ = this.store.select(alertListLoaded)

  alertForm: FormGroup
  alertTitle: string = `${this.data.exchangeName}:${this.data.fromSymbol}/${this.data.toSymbol}`
  selectedAlert!: IAlertListItem
  alertListArr!: IAlertListItem[]

  alertListLoadedSub!: Subscription 

  constructor(
    private store: Store<{ trades: ITradesStore }>,
    public dialogRef: MatDialogRef<TradesAlertModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITrade
  ) {

    this.alertForm = new FormGroup({
       condition: new FormControl(data.alert?.alertType, [Validators.required]),
    })
    
  }

  private initialInputValue(inputValue: string) {
    const key = inputValue as keyof typeof this.data
    return this.data[key] ?? '';
  }

  selectAlert(alertName: string | undefined) {
    console.log(this.alertListArr)
    this.selectedAlert = this.alertListArr.find(_alert => _alert.name === alertName)!
    this.selectedAlert.inputs.forEach((input, index) => {

      const initialValue = this.data.alert?.data[index].value
      ?? this.initialInputValue(input.value)

      this.alertForm.addControl(
        input.name, 
        new FormControl(initialValue, [Validators.required])
      )
    })
  }

  ngOnInit() {
    this.store.dispatch(getAlertList())
    this.alertListLoadedSub = this.alertListLoaded$.subscribe(loaded => {
      if(loaded) {
        this.alertList$
          .pipe(take(1))
          .subscribe(alertList => {
            this.alertListArr = alertList
            if(this.data.alert) {
              this.selectAlert(this.data.alert?.alertType)
            }
          })
      }
    })
  }

  ngOnDestroy() {
    this.alertListLoadedSub.unsubscribe()
  }

  onSubmit(): void {

    if(this.alertForm.invalid) return

    const alertType = this.alertForm.get('condition')?.value
    
    const data: IAlertAddInputs[] = this.selectedAlert.inputs
      .map(input => Object.assign({}, {
        name: input.name,
        value: this.alertForm.get(input.name)?.value
      })
    )

    const alertRequestData: IAlertAdd = {
      tradeId: this.data._id,
      alertType,
      data,
    }

    this.store.dispatch(addAlert(alertRequestData))
    this.dialogRef.close(true);
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

}
