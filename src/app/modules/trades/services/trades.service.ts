import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/services/config/config.service';
import { RequestService } from '@shared/services/http-request/http-requests.service';
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
    return this.requestService.httpGet(`${this.configService.getPairsByExchange}/${pairData.exchangeName}`);
  }

  getPriceByExchangeTS(pairData: ITradesModalPriceLoad): Observable<ITradesModalPriceSuccess> {
    return this.requestService.httpPost(this.configService.getPriceByExchangeTS, pairData);
  }

  getTrades(): Observable<ITradesGetSuccess> {
    return this.requestService.httpGet(this.configService.getTrades)
  }
  
  addTrade(tradeData: ITradesAdd): Observable<ITradesAddSuccess> {
    return this.requestService.httpPost(this.configService.addTrade, tradeData);
  }

  deleteTrade(trade: ITrade): Observable<ITradesDeleteSuccess> {
    return this.requestService.httpDelete(`${this.configService.deleteTrade}/${trade._id}`)
  }
  
  modifyTrade(tradeData: ITradesAdd): Observable<ITradesAddSuccess> {
    return this.requestService.httpPatch(this.configService.modifyTrade, tradeData);
  }

}
