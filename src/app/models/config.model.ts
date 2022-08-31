export interface IConfig {
	API_BASE_URL: string;
	API_ROUTES: {
		AUTH: {
			LOGIN:  string;
			LOGOUT: string;
			SIGNUP:  string;
		},
		NEWS: {
			GET_NEWS:  string;
		},
		MARKET: {
			GET_MARKET_LATEST:  string;
			GET_MARKET_ADDED: string;
		}
	}
}