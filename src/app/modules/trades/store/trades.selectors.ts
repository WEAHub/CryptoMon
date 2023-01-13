import { createSelector, createFeatureSelector } from "@ngrx/store";
import { EStatus } from "../../shared/models/status.enum";
import { IPair } from "../models/trades-modal.model";
import { ITrade, ITradesStore } from "../models/trades.model";
import { calcTotalInvest } from "../utils/trade.functions";

const tradesState = createFeatureSelector<ITradesStore>('trades');

// * MAIN TRADE COMPONENT
const tradesMessage = createSelector(
  tradesState,
  (state: ITradesStore) => state.message
)

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
	(state: ITradesStore) => state.trades
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

const alertList = createSelector(
	tradesState,
	(state: ITradesStore) => state.alerts.alertList
)

const alertListLoaded = createSelector(
  tradesState,
  (state: ITradesStore) => state.alerts.loaded
)

export {
  tradesMessage,
	tradesModalLoading,
	tradesModalGetExchanges,
	tradesModalGetPairs,
	tradesModalGetPrice,
	tradesLoading,
	tradesLoaded,
	getTrades,
  alertList,
  alertListLoaded
}