import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/services/config/config.service';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { ITrade, ITradeUpdate } from '../models/trades.model';

enum ESocketEvents {
  CHECK_TRADES = 'checkTrades',
  UPDATE_TRADES = 'updateTrades'
}

@Injectable({
  providedIn: 'root'
})
export class TradesRealTimeService extends Socket {
  onConnect!: Function
  onDisconnect!: Function
  connected: Boolean = this.ioSocket.connected

  constructor(
    private configService: ConfigService
  ) { 
    super(<SocketIoConfig>{
      url: configService.wsUrlTrades + '?authorization=' + localStorage.getItem('token'),
      options: {
        transports: ['websocket'],
      }
    });

    this.on('connect', this.onConnectEvent.bind(this))
    this.on('disconnect', this.onDisonnectEvent.bind(this))
  }

  private onConnectEvent() {
    this.onConnect();
  }

  private onDisonnectEvent() {
    this.onDisconnect();
  }



  getUpdatedTrades(): Observable<any> {
    return this.fromEvent(ESocketEvents.UPDATE_TRADES).pipe(
      map(data => data)
    )
  }

  async emitUpdateTrades(userTrades: ITrade[]) {
    this.emit(ESocketEvents.CHECK_TRADES, 
      userTrades.map(trade => 
        Object.assign({}, {
          id: trade._id,
          exchange: trade.exchangeName,
          fromSymbol: trade.fromSymbol,
          toSymbol: trade.toSymbol,
          alert: trade.alert
        })
      )
    )
  }


}
