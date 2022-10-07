import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '@shared/services/config/config.service';
import { RequestService } from '@shared/services/http-request/http-requests.service';

@Injectable()

export class MarketService {
  constructor(
    private requestService: RequestService,
    private configService: ConfigService
  ) {
  }

  getMarketLatest(): Observable<any> {
		return this.requestService.httpGet(this.configService.marketLatest);
	}
  
  getMarketAdded(): Observable<any> {
		return this.requestService.httpGet(this.configService.marketAdded);
	}

}