import { createSelector, createFeatureSelector } from "@ngrx/store";
import { EStatus } from "../../shared/models/status.enum";
import { IPair } from "../models/trades-modal.model";
import { ITrade, ITradesStore } from "../models/trades.model";
import { calcTotalInvest } from "../utils/trade.functions";

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

// * Get Trades
const getTrades = createSelector(
	tradesState,
	(state: ITradesStore) => state.trades.map((trade: ITrade) => {
		return {
			...trade,
			percentType: trade.percentChange > 0 
			? 'up'
			: trade.percentChange < 0
				? 'down'
				: 'neutral'
		}
	}).sort((a, b) => b.timeStampAdded - a.timeStampAdded)
)

// * Trades loading
const tradesLoading = createSelector(
	tradesState,
	(state: ITradesStore) => state.status === EStatus.LOADING
)

const tradesLoaded = createSelector(
	tradesState,
	(state: ITradesStore) => state.status === EStatus.LOADED
)

export {
	tradesModalLoading,
	tradesModalGetExchanges,
	tradesModalGetPairs,
	tradesModalGetPrice,
	tradesLoading,
	tradesLoaded,
	getTrades,

}