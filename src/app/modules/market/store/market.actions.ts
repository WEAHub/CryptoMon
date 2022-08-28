import { createAction, props } from '@ngrx/store';
import { marketData, marketAsset } from '../models/market-table.model';

enum ActionTypes {
  MARKET_REQUEST = '[Market] Retrieving market data...',
  MARKET_REQUEST_SUCCESS = '[Market] Data Success',
  MARKET_REQUEST_ERROR = '[Market] Data Error',
}

const marketTableStart = createAction(ActionTypes.MARKET_REQUEST);
const marketTableSuccess = createAction(ActionTypes.MARKET_REQUEST_SUCCESS, props<{ assets: marketAsset[] }>());
const marketTableError = createAction(ActionTypes.MARKET_REQUEST_ERROR);

export {
  marketTableStart,
  marketTableSuccess,
  marketTableError
}