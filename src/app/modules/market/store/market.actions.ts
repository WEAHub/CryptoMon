import { createAction, props } from '@ngrx/store';
import { marketAsset, marketAssetAdded } from '../models/market-table.model';

enum ActionTypes {
  MARKET_REQUEST = '[Market] Retrieving market data...',
  MARKET_REQUEST_SUCCESS = '[Market] Data Success',
  MARKET_REQUEST_ERROR = '[Market] Data Error',
  
  MARKET_ADDED_REQUEST = '[Market Added] Retrieving market data...',
  MARKET_ADDED_REQUEST_SUCCESS = '[Market Added] Data Success',
  MARKET_ADDED_REQUEST_ERROR = '[Market Added] Data Error',
}

const marketTableStart = createAction(ActionTypes.MARKET_REQUEST);
const marketTableSuccess = createAction(ActionTypes.MARKET_REQUEST_SUCCESS, props<{ assets: marketAsset[] }>());
const marketTableError = createAction(ActionTypes.MARKET_REQUEST_ERROR);

const marketTableAddedStart = createAction(ActionTypes.MARKET_ADDED_REQUEST);
const marketTableAddedSuccess = createAction(ActionTypes.MARKET_ADDED_REQUEST_SUCCESS, props<{ assets: marketAssetAdded[] }>());
const marketTableAddedError = createAction(ActionTypes.MARKET_ADDED_REQUEST_ERROR);


export {
  marketTableStart,
  marketTableSuccess,
  marketTableError,
  marketTableAddedStart,
  marketTableAddedSuccess,
  marketTableAddedError
}