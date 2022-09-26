import { createReducer, on } from '@ngrx/store';
import * as marketActions from './market.actions';
import { marketData, marketStatus } from '../models/market-table.model';

const initialState: marketData = {
	marketAssets: [],
	marketAdded: [],
	statusAdded:  marketStatus.UNINITIALIZED,
	statusAssets: marketStatus.UNINITIALIZED
}

const marketReducer = createReducer(
	initialState,
	on(marketActions.marketTableStart, (state) => {
		return {
			...state,
			statusAssets: marketStatus.LOADING,
			error: '',
		}
	}),
	on(marketActions.marketTableSuccess, (state, payload) => {
		return {
			...state,
			marketAssets: payload.assets,
			statusAssets: marketStatus.LOADED,
			error: '',
		}
	}),
	on(marketActions.marketTableError, (state) => {
		return {
			...state,
			statusAssets: marketStatus.ERROR
		}
	}),
	on(marketActions.marketTableAddedStart, (state) => {
		return {
			...state,
			statusAdded: marketStatus.LOADING,
			error: '',
		}
	}),
	on(marketActions.marketTableAddedSuccess, (state, payload) => {
		return {
			...state,
			marketAdded: payload.assets,
			statusAdded: marketStatus.LOADED,
			error: '',
		}
	}),
	on(marketActions.marketTableAddedError, (state) => {
		return {
			...state,
			statusAdded: marketStatus.ERROR
		}
	}),
	on(marketActions.resetStateMarket, () => {
		return Object.assign({}, initialState)
	}),
)

export {
	marketReducer	
}