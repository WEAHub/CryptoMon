import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface IAlertData {
  exchange: string;
  fromSymbol: string;
  toSymbol: string;
  actualPrice: number;
}

@Component({
  selector: 'app-trades-alert-modal',
  templateUrl: './trades-alert-modal.component.html',
  styleUrls: ['./trades-alert-modal.component.scss']
})
export class TradesAlertModalComponent implements OnInit {

  alertForm: FormGroup
  alertTitle: string = `${this.data.exchange}:${this.data.fromSymbol}/${this.data.toSymbol}`
  alertConditions: Array<string> = [
    'Price crossover',
    'Price crossunder'
  ]

  constructor(
    public dialogRef: MatDialogRef<TradesAlertModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAlertData
  ) {

    this.alertForm = new FormGroup({
       condition: new FormControl('', [Validators.required]),
       //price: new FormControl(data.actualPrice, [Validators.required]),
    })

  }

  ngOnInit(): void {

  }

  onSubmit(): void {

  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

}
