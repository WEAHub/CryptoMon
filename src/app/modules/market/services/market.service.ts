import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { marketAsset, marketData, marketStatus } from '../models/market-table.model';

@Injectable()

export class MarketService {

  API_HOST = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getMarketLatest(): Observable<any> {
		return this.http.get(`${this.API_HOST}/market/getMarketLatest`);
	}
  
}