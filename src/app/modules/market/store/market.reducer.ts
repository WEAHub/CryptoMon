import { createReducer, on, Action } from '@ngrx/store';
import * as marketActions from './market.actions';
import { marketAsset, marketData, marketStatus } from '../models/market-table.model';

const initialState: marketData = {
	data: [],
	status: marketStatus.UNINITIALIZED
}

const marketReducer = createReducer(
	initialState,
	on(marketActions.marketTableStart, (state) => {
		return {
			...state,
			status: marketStatus.LOADING,
			error: '',
		}
	}),
	on(marketActions.marketTableSuccess, (state, payload) => {
		return {
			...state,
			data: payload.assets,
			status: marketStatus.LOADED,
			error: '',
		}
	}),
)

export {
	marketReducer	
}