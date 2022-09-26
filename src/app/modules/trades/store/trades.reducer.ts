import { createReducer, on } from '@ngrx/store';
import { ITradesModalError, ITradesModalPairSuccess, ITradesModalPriceSuccess } from '../models/trades-modal.model';
import { ITradesStore } from '../models/trades.model';
import * as tradesActions from './trades.actions';

const initialState: ITradesStore = {
	loading: false,
	modalStore: {
		loading: false,
		exchanges: [],
		pairs: [],
		price: 0,
		toSymbolPrice: '',
		error: '',
	}
}

const tradesReducer = createReducer(
	initialState,
	// * TRADES MODAL
	on(tradesActions.tradesModalLoadExchanges, (state) => {
		return {
			...state,
			modalStore: {
				...state.modalStore,
				loading: true,
				exchanges: [],
				price: 0,
				toSymbolPrice: '',
				pairs: [],
				error: '',
			}
		}
	}),
	on(tradesActions.tradesModalLoadExchangesSuccess, (state, payload) => {
		return {
			...state,
			modalStore: {
				...state.modalStore,
				loading: false,
				exchanges: payload.exchanges,
				pairs: [],
				error: '',
			}
		}
	}),
	on(tradesActions.tradesModalLoadExchangesError, (state, payload: ITradesModalError) => {
		return {
			...state,
			modalStore: {
				...state.modalStore,
				loading: false,
				exchanges: [],
				pairs: [],
				error: payload.error,
			}
		}
	}),
	on(tradesActions.tradesModalLoadPairs, (state) => {
		return {
			...state,
			modalStore: {
				...state.modalStore,
				loading: true,
			}
		}
	}),
	on(tradesActions.tradesModalLoadPairsSuccess, (state, payload: ITradesModalPairSuccess) => {
		return {
			...state,
			modalStore: {
				...state.modalStore,
				pairs: payload.pairs,
				loading: false,
			}
		}
	}),
	on(tradesActions.tradesModalLoadPairsError, (state, payload: ITradesModalError) => {
		return {
			...state,
			modalStore: {
				...state.modalStore,
				pairs: [],
				loading: false,
				error: payload.error
			}
		}
	}),
	on(tradesActions.tradesModalLoadPrice, (state) => {
		return {
			...state,
			modalStore: {
				...state.modalStore,
				price: 0,
				toSymbolPrice: '',
				loading: true,
			}
		}
	}),
	on(tradesActions.tradesModalLoadPriceSuccess, (state, payload: ITradesModalPriceSuccess) => {
		return {
			...state,
			modalStore: {
				...state.modalStore,
				price: payload.price,
				toSymbolPrice: payload.toSymbol,
				loading: false,
			}
		}
	}),
	on(tradesActions.tradesModalLoadPriceError, (state, payload: ITradesModalError) => {
		return {
			...state,
			modalStore: {
				...state.modalStore,
				price: 0,
				toSymbolPrice: '',
				loading: false,
				error: payload.error
			}
		}
	}),
	on(tradesActions.resetStateTradesModal, () => {
		return Object.assign({}, initialState)
	}),
);

export {
	tradesReducer
}
