import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ConfigService } from '@modules/shared/services/config/config.service';
import { ITrade, ITradeAlertFinished, ITradesStore } from '@modules/trades/models/trades.model';
import { TradesDataService } from '@modules/trades/services/trades-data.service';
import { alertFinished } from '@modules/trades/store/trades.actions';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trade-alert-notify',
  templateUrl: './trade-alert-notify.component.html',
  styleUrls: ['./trade-alert-notify.component.scss'],
})

export class TradeAlertNotifyComponent implements OnInit, OnDestroy {

  @Output() chartForTrade: EventEmitter<ITrade> = new EventEmitter<ITrade>();
  @Output() finishAlert:  EventEmitter<ITrade> = new EventEmitter<ITrade>();

  alertsSub!: Subscription
  tradeAlerts: ITrade[] = []

  notifyAudio: HTMLAudioElement = new Audio()

  constructor(
    public configService: ConfigService,
    private tradesData: TradesDataService,
    private store: Store<{ trades: ITradesStore }>,
  ) { 
    this.notifyAudio.src = '/assets/sounds/alert-notify.mp3'
    this.notifyAudio.load();
  }

  ngOnInit(): void {
    this.alertsSub = this.tradesData.alertsData.subscribe(tradeAlerts => {

      const alreadyAlerts = this.tradeAlerts.map(trade => trade.alert?._id)
      const newAlerts = tradeAlerts.map(trade => trade.alert?._id)
      const filteredAlerts = newAlerts.filter(alertId => !alreadyAlerts.includes(alertId))
      
      if(filteredAlerts.length) {
        const newAlertsToPush = tradeAlerts.filter(trade => filteredAlerts.includes(trade.alert?._id))
        this.tradeAlerts.push(...newAlertsToPush)
        this.notifyAudio.play();
      }

    })
  }

  finishAlarm(trade: ITrade) {
    const alarmIdx = this.tradeAlerts.findIndex(_trade => _trade._id === trade._id)
    if(alarmIdx !== -1) {
      this.tradeAlerts.splice(alarmIdx, 1)
      this.finishAlert.emit(trade)
    }
  }

  openChart(trade: ITrade) {
    this.chartForTrade.emit(trade)
  }

  ngOnDestroy(): void {
    this.alertsSub.unsubscribe();
  }

}
