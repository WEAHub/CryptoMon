import { createReducer, on } from '@ngrx/store';
import { EStatus } from '../../shared/models/status.enum';
import { ITradesModalError, ITradesModalPairSuccess, ITradesModalPriceSuccess } from '../models/trades-modal.model';
import { ITradesGetError, ITradesGetSuccess, ITradesStore } from '../models/trades.model';
import { calcTotalInvest, processTrades, updateTrades } from '../utils/trade.functions';
import * as tradesActions from './trades.actions';

const initialState: ITradesStore = {
	error: '',
	status: EStatus.UNINITIALIZED,
	trades: [],
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
	on(tradesActions.tradesGet, (state) => {
		return {
			...state,
			status: EStatus.LOADING
		}
	}),
	on(tradesActions.tradesGetSuccess, (state, payload: ITradesGetSuccess) => {
		return {
			...state,
			status: EStatus.LOADED,
			trades: processTrades(payload.userTrades),
		}
	}),
	on(tradesActions.tradesGetError, (state, payload: ITradesGetError) => {
		return {
			...state,
			status: EStatus.ERROR,
			error: payload.error
		}
	}),
	on(tradesActions.resetStateTradesModal, () => {
		return Object.assign({}, initialState)
	}),
);

export {
	tradesReducer
}
