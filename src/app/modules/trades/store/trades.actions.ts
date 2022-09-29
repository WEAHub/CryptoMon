import { createAction, props } from '@ngrx/store';

import { 
	ITradesModalExchangeSuccess, 
	ITradesModalPairLoad, 
	ITradesModalPairSuccess, 
	ITradesModalPriceLoad, 
	ITradesModalPriceSuccess ,
	ITradesModalError,
	ITradesAdd,
	ITradesAddSuccess, 
} from '../models/trades-modal.model';

import { 
	ITrade,
	ITradesDeleteError,
	ITradesDeleteSuccess,
	ITradesGetError, 
	ITradesGetSuccess 
} from '../models/trades.model';

enum ActionTypes {
  TRADES_REQUEST = '[Trades] Getting Trades',
  TRADES_REQUEST_SUCCESS = '[Trades] Getting Trades Success',
  TRADES_REQUEST_ERROR = '[Trades] Getting Trades Error',

	TRADES_EXCHANGES= '[Trades Modal] Loading Exchanges',
	TRADES_EXCHANGES_SUCCESS = '[Trades Modal] Trades Exchanges Sucess',
	TRADES_EXCHANGES_ERROR = '[Trades Modal] Trades Exchanges Error',

	TRADES_PAIRS = '[Trades Modal] Loading Pairs',
	TRADES_PAIRS_SUCCESS = '[Trades Modal] Trades Pairs Sucess',
	TRADES_PAIRS_ERROR = '[Trades Modal] Trades Pairs Error',

	TRADES_PRICE = '[Trades Modal] Loading Price',
	TRADES_PRICE_SUCCESS = '[Trades Modal] Trades Price Sucess',
	TRADES_PRICE_ERROR = '[Trades Modal] Trades Price Error',

	TRADES_ADD = '[Trades] Add Trade',
	TRADES_ADD_SUCCESS = '[Trades] Add Trade Success',
	TRADES_ADD_ERROR = '[Trades] Add Trade Error',

	TRADES_GET = '[Trades] Get Trades',
	TRADES_GET_SUCCESS = '[Trades] Get Trades Success',
	TRADES_GET_ERROR = '[Trades] Get Trades Error',

	TRADES_DELETE = '[Trades] Delete Trade',
	TRADES_DELETE_SUCCESS = '[Trades] Delete Trade Success',
	TRADES_DELETE_ERROR = '[Trades] Delete Trade Error',

	TRADES_RESET = '[Trades] Reset Trades',
}

// * LOAD EXCHANGES
const tradesModalLoadExchanges = createAction(ActionTypes.TRADES_EXCHANGES);
const tradesModalLoadExchangesSuccess = createAction(ActionTypes.TRADES_EXCHANGES_SUCCESS, props<ITradesModalExchangeSuccess>());
const tradesModalLoadExchangesError = createAction(ActionTypes.TRADES_EXCHANGES_ERROR, props<ITradesModalError>());

// * LOAD PAIRS BY EXCHANGE
const tradesModalLoadPairs = createAction(ActionTypes.TRADES_PAIRS, props<ITradesModalPairLoad>());
const tradesModalLoadPairsSuccess = createAction(ActionTypes.TRADES_PAIRS_SUCCESS, props<ITradesModalPairSuccess>());
const tradesModalLoadPairsError = createAction(ActionTypes.TRADES_PAIRS_ERROR, props<ITradesModalError>());

// * LOAD PRICE BY EXCHANGE TS
const tradesModalLoadPrice = createAction(ActionTypes.TRADES_PRICE, props<ITradesModalPriceLoad>());
const tradesModalLoadPriceSuccess = createAction(ActionTypes.TRADES_PRICE_SUCCESS, props<ITradesModalPriceSuccess>());
const tradesModalLoadPriceError = createAction(ActionTypes.TRADES_PRICE_ERROR, props<ITradesModalError>());

// * ADD TRADE
const tradesAdd = createAction(ActionTypes.TRADES_ADD, props<ITradesAdd>());
const tradesAddSuccess = createAction(ActionTypes.TRADES_ADD_SUCCESS, props<ITradesAddSuccess>());
const tradesAddError = createAction(ActionTypes.TRADES_ADD_ERROR, props<ITradesModalError>());

// * GET TRADES
const tradesGet = createAction(ActionTypes.TRADES_GET);
const tradesGetSuccess = createAction(ActionTypes.TRADES_GET_SUCCESS, props<ITradesGetSuccess>());
const tradesGetError = createAction(ActionTypes.TRADES_GET_ERROR, props<ITradesGetError>());

// * DELETE TRADE
const tradesDelete = createAction(ActionTypes.TRADES_DELETE, props<ITrade>());
const tradesDeleteSuccess = createAction(ActionTypes.TRADES_DELETE_SUCCESS, props<ITradesDeleteSuccess>());
const tradesDeleteError = createAction(ActionTypes.TRADES_DELETE_ERROR, props<ITradesDeleteError>());

// * RESET STATES
const resetStateTradesModal = createAction(ActionTypes.TRADES_RESET);

export {
	tradesModalLoadExchanges,
	tradesModalLoadExchangesSuccess,
	tradesModalLoadExchangesError,
	tradesModalLoadPairs,
	tradesModalLoadPairsSuccess,
	tradesModalLoadPairsError,
	tradesModalLoadPrice,
	tradesModalLoadPriceSuccess,
	tradesModalLoadPriceError,
	tradesAdd,
	tradesAddSuccess,
	tradesAddError,
	tradesGet,
	tradesGetSuccess,
	tradesGetError,
	tradesDelete,
	tradesDeleteSuccess,
	tradesDeleteError,
	resetStateTradesModal,
}