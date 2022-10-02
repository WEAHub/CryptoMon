import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SCRIPT_ID, tvWidgetConfig } from './constants/tv.model'


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

  tradingView: any;

  constructor(
    public dialogRef: MatDialogRef<TradesChartModalComponent>,
    public renderer: Renderer2,
    @Inject(MAT_DIALOG_DATA) public data: ITradeModalData,
    @Inject(DOCUMENT) private document: Document,
  ) { 
  }

  ngOnInit() {
    this.addScript(this.runWidget.bind(this))
  }

  addScript(onLoad: VoidFunction): void {
    if(!this.scriptExists) {
      const tvScript = this.renderer.createElement('script');
      tvScript.id = SCRIPT_ID
      tvScript.type = 'text/javascript';
      tvScript.src = 'https://s3.tradingview.com/tv.js';
      tvScript.onload = onLoad
      this.renderer.appendChild(this.document.body, tvScript);
    }
    else {
      this.runWidget()
    }
  }
  
  runWidget(): void {
    const symbolData = this.data;
    const symbol = `${symbolData?.exchange.toUpperCase()}:${symbolData?.fromSymbol.toUpperCase()}${symbolData?.toSymbol.toUpperCase()}`
    const tvConfig = {
      ...tvWidgetConfig,
      symbol
    }
    new (globalThis as any).TradingView['widget'](tvConfig)
  }

  get scriptExists(): boolean {
    return this.document.getElementById(SCRIPT_ID) !== null;
  }
}
