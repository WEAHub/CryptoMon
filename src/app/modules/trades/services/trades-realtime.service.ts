import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/services/config/config.service';
import { Socket } from 'ngx-socket-io';
import { map, Observable } from 'rxjs';
import { ITrade, ITradeUpdate } from '../models/trades.model';


@Injectable()

export class TradesRealTimeService extends Socket {

  constructor(
    private configService: ConfigService
  ) { 
    super({
      url: 'ws://localhost:3001/wsTrade',
      options: {
        transports: ['websocket']
      }
    });
  }

  getUpdatedTrades(): Observable<any> {
    return this.fromEvent('updateTrades').pipe(
      map(data => data)
    )
  }

  async updateTrades(userTrades: ITrade[]) {
    return this.emit('checkTrades', userTrades.map(trade => Object.assign({}, {
      id: trade._id,
      exchange: trade.exchangeName,
      fromSymbol: trade.fromSymbol,
      toSymbol: trade.toSymbol,
    })))

  }


}
