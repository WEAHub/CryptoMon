import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap } from 'rxjs';
import { IConfig } from '../models/config.model';

const configFactory = (config: ConfigService): 
	(() => Observable<Object>) => () => config.loadConfig();

@Injectable({
  providedIn: 'root',
})

class ConfigService {
	private appConfig: IConfig = <IConfig>{};
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
		this.checkConfig();
		return this.appConfig.API_BASE_URL + this.appConfig.API_ROUTES.AUTH.LOGIN;
	}

	get logout(): string {
		this.checkConfig();
		return this.appConfig.API_BASE_URL + this.appConfig.API_ROUTES.AUTH.LOGOUT;
	}

	get signup(): string {
		this.checkConfig();
		return this.appConfig.API_BASE_URL + this.appConfig.API_ROUTES.AUTH.SIGNUP;
	}

	get getNews(): string {
		this.checkConfig();
		return this.appConfig.API_BASE_URL + this.appConfig.API_ROUTES.NEWS.GET_NEWS;
	}

	get marketLatest(): string {
		this.checkConfig();
		return this.appConfig.API_BASE_URL + this.appConfig.API_ROUTES.MARKET.GET_MARKET_LATEST;
	}

}

export {
	ConfigService,
	configFactory
}