import { Injectable } from '@angular/core';
import { RequestService } from '../../shared/services/http-requests.module';
import { ConfigService } from 'src/app/services/config.service';
import { Observable } from 'rxjs';
import { 
  ITradesAdd,
  ITradesModalExchangeSuccess, 
  ITradesModalPairLoad, 
  ITradesModalPairSuccess, 
  ITradesModalPriceLoad, 
  ITradesModalPriceSuccess, 
  ITradesAddSuccess
} from '../models/trades-modal.model';

import { 
  ITrade, 
  ITradesDeleteSuccess, 
  ITradesGetSuccess
} from '../models/trades.model';

@Injectable()

export class TradesService {

  constructor(
    private requestService: RequestService,
    private configService: ConfigService
  ) { }

  getAllExchanges(): Observable<ITradesModalExchangeSuccess> {
    return this.requestService.httpGet(this.configService.getAllExchanges);
  }

  getPairsByExchange(pairData: ITradesModalPairLoad): Observable<ITradesModalPairSuccess> {
    return this.requestService.httpGet(this.configService.getPairsByExchange + `/${pairData.exchangeName}`);
  }

  getPriceByExchangeTS(pairData: ITradesModalPriceLoad): Observable<ITradesModalPriceSuccess> {
    return this.requestService.httpPost(this.configService.getPriceByExchangeTS, pairData);
  }

  addTrade(tradeData: ITradesAdd): Observable<ITradesAddSuccess> {
    return this.requestService.httpPost(this.configService.addTrade, tradeData);
  }

  getTrades(): Observable<ITradesGetSuccess> {
    return this.requestService.httpGet(this.configService.getTrades)
  }

  deleteTrade(trade: ITrade): Observable<ITradesDeleteSuccess> {
    console.log(this.configService.deleteTrade, trade)
    return this.requestService.httpPost(this.configService.deleteTrade, trade)
  }
  
  modifyTrade(tradeData: ITradesAdd): Observable<ITradesAddSuccess> {
    return this.requestService.httpPost(this.configService.modifyTrade, tradeData);
  }

}
