export interface IConfig {
	API_BASE_URL: string;
	API_ROUTES: {
		AUTH: {
			LOGIN:  string;
			LOGOUT: string;
			SIGNUP:  string;
		},
		USER: {
			MODIFY: string;
			DELETE: string;
		},
		NEWS: {
			GET_NEWS:  string;
		},
		MARKET: {
			GET_MARKET_LATEST:  string;
			GET_MARKET_ADDED: string;
		},
		TRADES: {
			GET_ALL_EXCHANGES: string;
			GET_PAIRS_BY_EXCHANGE: string;
			GET_PRICE_BY_EXCHANGE_TS: string;
			TRADE_ADD: string;
		}
	}
}