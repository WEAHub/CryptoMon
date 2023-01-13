import { Injectable } from '@angular/core';
import { ConfigService } from '@shared/services/config/config.service';
import { RequestService } from '@shared/services/http-request/http-requests.service';
import { Observable, of } from 'rxjs';

import { 
  ITradesAdd,
  ITradesModalExchangeSuccess, 
  ITradesModalPairLoad, 
  ITradesModalPairSuccess, 
  ITradesModalPriceLoad, 
  ITradesModalPriceSuccess,
  ITradesModalSuccess, 
} from '../models/trades-modal.model';

import { 
  IAlertAdd,
  IAlertsList,
  ITrade,
  ITradeAlertFinished,
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
  
  addTrade(tradeData: ITradesAdd): Observable<ITradesModalSuccess> {
    return this.requestService.httpPost(this.configService.addTrade, tradeData);
  }

  deleteTrade(trade: ITrade): Observable<ITradesModalSuccess> {
    return this.requestService.httpDelete(`${this.configService.deleteTrade}/${trade._id}`)
  }
  
  modifyTrade(tradeData: ITradesAdd): Observable<ITradesModalSuccess> {
    return this.requestService.httpPatch(this.configService.modifyTrade, tradeData);
  }

  getAlertList(): Observable<IAlertsList> {
    return this.requestService.httpGet(this.configService.alertList)
  }

  addAlert(alertData: IAlertAdd): Observable<ITradesModalSuccess> {
    return this.requestService.httpPut(this.configService.addAlert, alertData)
  }

  finishAlert(alertData: ITradeAlertFinished): Observable<ITradesModalSuccess> {
    return this.requestService.httpPatch(this.configService.finishAlert, alertData)
  }
  
}
