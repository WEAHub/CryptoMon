

// * MODAL STORE
interface ITradesStoreModal {
	loading: Boolean;
	exchanges: Array<IExchange>;
	pairs: Array<IPair>;
	price: number;
	toSymbolPrice: string;
	error: string;
}

// * LOAD EXCHANGES
interface ITradesModalExchangeSuccess {
	exchanges: IExchange[];
}

interface IExchange {
	id: number;
	name: string;
}

// * LOAD PAIRS
interface IPair {
	exchange: string;
	exchange_fsym: string;
	exchange_tsym: string;
	fsym: string;
	tsym: string;
	last_update: Number;
	pairs: String;
}

interface ITradesModalPairLoad {
	exchangeName: string;
}

interface ITradesModalPairSuccess {
	pairs: IPair[];
}


// * LOAD PRICE
interface ITradesModalPriceLoad {
	timeStamp: number;
	exchangeName: String;
	fromSymbol: String;
	toSymbol: String;
}


interface ITradesModalPriceSuccess{
	price: number;
	toSymbol: string;
}

// * ADD TRADE
interface ITradesAdd extends ITradesModalPriceLoad {
	tradeType: string;
	quantity: number;
	price: number;
}

interface ITradesAddSuccess {
	message: string
}

// * ERROR 
interface ITradesModalError {
	error: string;
}


// * PRICE MODEL
interface IPrice {
	price: number;
	toSymbol: string;
}

export {
	ITradesStoreModal,
	ITradesModalExchangeSuccess,
	ITradesModalPairSuccess,
	ITradesModalPairLoad,
	ITradesModalPriceLoad,
	ITradesModalPriceSuccess,
	ITradesModalError,
	ITradesAdd,
	ITradesAddSuccess,
	IPair,
	IExchange,
	IPrice,
}