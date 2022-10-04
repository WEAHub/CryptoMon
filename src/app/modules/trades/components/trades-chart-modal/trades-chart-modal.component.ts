import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


interface ITradeModalData {
  fromSymbol: string;
  toSymbol: string;
  exchange: string;
}

@Component({
  selector: 'app-trades-chart-modal',
  templateUrl: './trades-chart-modal.component.html',
  styleUrls: ['./trades-chart-modal.component.scss']
})

export class TradesChartModalComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<TradesChartModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITradeModalData,

  ) { 
    
  }

  ngOnInit() {

  }


}
