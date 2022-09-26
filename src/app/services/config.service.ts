import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

import { IConfig } from '../models/config.model';

const configFactory = (config: ConfigService): 
	(() => Observable<Object>) => () => config.loadConfig();

@Injectable({
  providedIn: 'root',
})

class ConfigService {
	public appConfig: IConfig = <IConfig>{};
  constructor(private http: HttpClient) {}
  
  loadConfig(): Observable<Object> {
    return this.http.get('/assets/config.json')
			.pipe(
				map(jsonConfig => this.appConfig = <IConfig>jsonConfig),
				catchError(error => {
					throw Error(error)
				})
			)
  }

	private checkConfig() {
		if(!this.appConfig) {
			throw Error('Config file not loaded!')
		}
	}


	get apiBaseUrl(): string {
		this.checkConfig();
		return this.appConfig.API_BASE_URL;
	}


	get login(): string {
		return this.apiBaseUrl + this.appConfig.API_ROUTES.AUTH.LOGIN;
	}

	get logout(): string {
		return this.apiBaseUrl + this.appConfig.API_ROUTES.AUTH.LOGOUT;
	}

	get signup(): string {
		return this.apiBaseUrl + this.appConfig.API_ROUTES.AUTH.SIGNUP;
	}

	get getNews(): string {
		return this.apiBaseUrl + this.appConfig.API_ROUTES.NEWS.GET_NEWS;
	}

	get marketLatest(): string {
		return this.apiBaseUrl + this.appConfig.API_ROUTES.MARKET.GET_MARKET_LATEST;
	}

	get marketAdded(): string {
		return this.apiBaseUrl + this.appConfig.API_ROUTES.MARKET.GET_MARKET_ADDED;
	}

	get modifyUser(): string {
		return this.apiBaseUrl + this.appConfig.API_ROUTES.USER.MODIFY;
	}
	
	get deleteUser(): string {
		return this.apiBaseUrl + this.appConfig.API_ROUTES.USER.DELETE;
	}

	get getAllExchanges(): string {
		return this.apiBaseUrl + this.appConfig.API_ROUTES.TRADES.GET_ALL_EXCHANGES;
	}

	get getPairsByExchange(): string {
		return this.apiBaseUrl + this.appConfig.API_ROUTES.TRADES.GET_PAIRS_BY_EXCHANGE;
	}
	
	get getPriceByExchangeTS(): string {
		return this.apiBaseUrl + this.appConfig.API_ROUTES.TRADES.GET_PRICE_BY_EXCHANGE_TS;
	}
	
	get addTrade(): string {
		return this.apiBaseUrl + this.appConfig.API_ROUTES.TRADES.TRADE_ADD;
	}
	
}	

export {
	ConfigService,
	configFactory
}