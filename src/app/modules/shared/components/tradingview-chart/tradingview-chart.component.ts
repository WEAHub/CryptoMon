import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { SCRIPT_ID, tvWidgetConfig } from './constants/tv.model'

@Component({
  selector: 'app-tradingview-chart',
  templateUrl: './tradingview-chart.component.html',
  styleUrls: ['./tradingview-chart.component.scss']
})
export class TradingviewChartComponent implements OnInit, AfterViewInit {

  @Input() exchange: string = 'BITFINEX';
  @Input() fromSymbol: string = 'BTC';
  @Input() toSymbol: string = 'USD';

  containerID = `tv-chart-${Math.round(Math.random() * (9999 - 1) + 1)}`

  constructor(
    public renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
  ) { 

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    // ! Bindeamos el contexto actual al callback onLoad.
    // ? Para no perder el contexto global y de esta clase
    // ? al terminar de cargar el script.
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
    const symbol = `${this.exchange.toUpperCase()}:${this.fromSymbol.toUpperCase()}${this.toSymbol.toUpperCase()}`
    const tvConfig = {
      ...tvWidgetConfig, 
     'container_id': this.containerID,
      symbol
    }
    new (globalThis as any).TradingView['widget'](tvConfig)
  }

  get scriptExists(): boolean {
    return this.document.getElementById(SCRIPT_ID) !== null;
  }
}
