import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/services/config.service';

@Injectable()

export class MarketService {
  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
  }

  getMarketLatest(): Observable<any> {
		return this.http.get(this.configService.marketLatest);
	}
  
  getMarketAdded(): Observable<any> {
		return this.http.get(this.configService.marketAdded);
	}

}