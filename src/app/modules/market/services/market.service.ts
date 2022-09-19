import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';
import { RequestService } from '../../shared/services/http-requests.module';

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