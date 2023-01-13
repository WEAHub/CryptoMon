import { createAction, props } from '@ngrx/store';

import { 
	ITradesModalExchangeSuccess, 
	ITradesModalPairLoad, 
	ITradesModalPairSuccess, 
	ITradesModalPriceLoad, 
	ITradesModalPriceSuccess ,
	ITradesModalError,
	ITradesAdd,
  ITradesModify,
  ITradesModalSuccess, 
} from '../models/trades-modal.model';

import { 
  IAlertAdd,
  IAlertsList,
	ITrade,
	ITradeAlertFinished,
	ITradesDeleteError,
	ITradesGetError, 
	ITradesGetSuccess, 
  ITradeUpdate
} from '../models/trades.model';

enum ActionTypes {
  // ! ADD MODAL
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

	TRADES_MODIFY = '[Trades] Modify Trade',
	TRADES_MODIFY_SUCCESS = '[Trades] Modify Trade Success',
	TRADES_MODIFY_ERROR = '[Trades] Modify Trade Error',

  // ! TABLE
	TRADES_GET = '[Trades] Get Trades',
	TRADES_GET_SUCCESS = '[Trades] Get Trades Success',
	TRADES_GET_ERROR = '[Trades] Get Trades Error',

	TRADES_DELETE = '[Trades] Delete Trade',
	TRADES_DELETE_SUCCESS = '[Trades] Delete Trade Success',
	TRADES_DELETE_ERROR = '[Trades] Delete Trade Error',

  TRADES_UPDATE = '[Trades] Socket Update Trade',

	TRADES_RESET = '[Trades] Reset Trades',

  // ! ALERT MODAL
  GET_ALERT_LIST = '[Trades Alert Modal] Get alert list',
  GET_ALERT_LIST_SUCCESS = '[Trades Alert Modal] Get alert list success',
  GET_ALERT_LIST_ERROR = '[Trades Alert Modal] Get alert list error',

  ADD_ALERT_LIST = '[Trades Alert Modal] ADD alert list',
  ADD_ALERT_LIST_SUCCESS = '[Trades Alert Modal] ADD alert list success',
  ADD_ALERT_LIST_ERROR = '[Trades Alert Modal] ADD alert list error',

  ALERT_FINISHED = '[Trades Alert] Alert finished',
  ALERT_FINISHED_SUCCESS = '[Trades Alert] Alert finished success',
  ALERT_FINISHED_ERROR = '[Trades Alert] Alert finished error',

  // ! SNACK BAR MSG
  SHOW_SNACKBAR_MSG = '[Trades] Show snackbar msg',
}

// ! TRADES ADD MODAL
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
const tradesAddSuccess = createAction(ActionTypes.TRADES_ADD_SUCCESS, props<ITradesModalSuccess>());
const tradesAddError = createAction(ActionTypes.TRADES_ADD_ERROR, props<ITradesModalError>());

// * MODIFY TRADE
const tradesModify = createAction(ActionTypes.TRADES_MODIFY, props<ITradesModify>());
const tradesModifySuccess = createAction(ActionTypes.TRADES_MODIFY_SUCCESS, props<ITradesModalSuccess>());
const tradesModifyError = createAction(ActionTypes.TRADES_MODIFY_ERROR, props<ITradesModalError>());

// ! TRADES TABLE

// * GET TRADES
const tradesGet = createAction(ActionTypes.TRADES_GET);
const tradesGetSuccess = createAction(ActionTypes.TRADES_GET_SUCCESS, props<ITradesGetSuccess>());
const tradesGetError = createAction(ActionTypes.TRADES_GET_ERROR, props<ITradesGetError>());

// * DELETE TRADE
const tradesDelete = createAction(ActionTypes.TRADES_DELETE, props<ITrade>());
const tradesDeleteSuccess = createAction(ActionTypes.TRADES_DELETE_SUCCESS, props<ITradesModalSuccess>());
const tradesDeleteError = createAction(ActionTypes.TRADES_DELETE_ERROR, props<ITradesDeleteError>());

// ! ALERTS
// * GET ALERT LIST
const getAlertList = createAction(ActionTypes.GET_ALERT_LIST)
const getAlertListSuccess = createAction(ActionTypes.GET_ALERT_LIST_SUCCESS, props<IAlertsList>())
const getAlertListError = createAction(ActionTypes.GET_ALERT_LIST_ERROR, props<ITradesModalError>())


// * ADD ALERT

const addAlert = createAction(ActionTypes.ADD_ALERT_LIST, props<IAlertAdd>())
const addAlertSuccess = createAction(ActionTypes.ADD_ALERT_LIST_SUCCESS, props<ITradesModalSuccess>())
const addAlertError = createAction(ActionTypes.ADD_ALERT_LIST_ERROR, props<ITradesModalError>())

const alertFinished = createAction(ActionTypes.ALERT_FINISHED, props<ITradeAlertFinished>())
const alertFinishedSuccess = createAction(ActionTypes.ALERT_FINISHED_SUCCESS, props<ITradesModalSuccess>())
const alertFinishedError = createAction(ActionTypes.ALERT_FINISHED_ERROR, props<ITradesModalError>())

// * SNACKBAR MSG
const showSnackBarMsg = createAction(ActionTypes.SHOW_SNACKBAR_MSG, props<{message: string}>())

// * RESET STATES
const resetStateTradesModal = createAction(ActionTypes.TRADES_RESET);

export {
  // SNACKBAR
  showSnackBarMsg,
  // ALERTS
  getAlertList,
  getAlertListSuccess,
  getAlertListError,
  addAlert,
  addAlertSuccess,
  addAlertError,
  alertFinished,
  alertFinishedSuccess,
  alertFinishedError,
  // ADD TRADE MODAL
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
  tradesModify,
  tradesModifySuccess,
  tradesModifyError,
  // TRADES TABLE
	tradesGet,
	tradesGetSuccess,
	tradesGetError,
	tradesDelete,
	tradesDeleteSuccess,
	tradesDeleteError,
	resetStateTradesModal,
}