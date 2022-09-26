import { createSelector, createFeatureSelector } from "@ngrx/store";
import { IPair } from "../models/trades-modal.model";
import { ITradesStore } from "../models/trades.model";

const tradesState = createFeatureSelector<ITradesStore>('trades');


// * Modal Loading
const tradesModalLoading = createSelector(
	tradesState,
	(state: ITradesStore) => state.modalStore.loading
)

// * Modal Get Exchanges
const tradesModalGetExchanges = createSelector(
	tradesState,
	(state: ITradesStore) => state.modalStore.exchanges
)

// * Modal Get Pairs
const tradesModalGetPairs = createSelector(
	tradesState,
	(state: ITradesStore) => state.modalStore.pairs.map((pair: IPair) => {
		return {
			...pair,
			pairs: `${pair.exchange_fsym}/${pair.exchange_tsym}`
		}
	}).sort((a, b) => a.exchange_fsym.localeCompare(b.exchange_fsym))
)

// * Modal Get Price
const tradesModalGetPrice = createSelector(
	tradesState,
	(state: ITradesStore) => {
		return {
			price: state.modalStore.price,
			toSymbol: state.modalStore.toSymbolPrice
		}
	}
)

export {
	tradesModalLoading,
	tradesModalGetExchanges,
	tradesModalGetPairs,
	tradesModalGetPrice,
	
}